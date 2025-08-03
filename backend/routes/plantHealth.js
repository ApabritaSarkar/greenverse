const express = require("express");
const router = express.Router();
const OwnedPlant = require("../models/OwnedPlant");
const verifyToken = require("../middleware/verifyToken");

// Get plant health overview for user
router.get("/health-overview", verifyToken, async (req, res) => {
  try {
    const plants = await OwnedPlant.find({ owner: req.userId });

    const overview = {
      totalPlants: plants.length,
      healthyPlants: plants.filter((p) =>
        ["thriving", "healthy"].includes(p.status)
      ).length,
      plantsNeedingAttention: plants.filter((p) =>
        ["needs_attention", "critical"].includes(p.status)
      ).length,
      overdueWatering: 0,
      overdueFertilizing: 0,
      overduePruning: 0,
      averageHealthScore: 0,
    };

    const now = new Date();
    plants.forEach((plant) => {
      if (
        plant.careSchedule.watering.nextDue &&
        plant.careSchedule.watering.nextDue < now
      ) {
        overview.overdueWatering++;
      }
      if (
        plant.careSchedule.fertilizing.nextDue &&
        plant.careSchedule.fertilizing.nextDue < now
      ) {
        overview.overdueFertilizing++;
      }
      if (
        plant.careSchedule.pruning.nextDue &&
        plant.careSchedule.pruning.nextDue < now
      ) {
        overview.overduePruning++;
      }
    });

    overview.averageHealthScore =
      plants.length > 0
        ? Math.round(
            plants.reduce((sum, plant) => sum + plant.healthScore, 0) /
              plants.length
          )
        : 0;

    res.json(overview);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching health overview",
        error: error.message,
      });
  }
});

// Get care reminders for user
router.get("/care-reminders", verifyToken, async (req, res) => {
  try {
    const plants = await OwnedPlant.find({ owner: req.userId });
    const reminders = [];
    const now = new Date();
    const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

    plants.forEach((plant) => {
      // Check watering
      if (plant.careSchedule.watering.nextDue) {
        if (plant.careSchedule.watering.nextDue <= now) {
          reminders.push({
            plantId: plant._id,
            plantName: plant.name,
            action: "watering",
            dueDate: plant.careSchedule.watering.nextDue,
            overdue: true,
            urgency: "high",
          });
        } else if (plant.careSchedule.watering.nextDue <= threeDaysFromNow) {
          reminders.push({
            plantId: plant._id,
            plantName: plant.name,
            action: "watering",
            dueDate: plant.careSchedule.watering.nextDue,
            overdue: false,
            urgency: "medium",
          });
        }
      }

      // Check fertilizing
      if (plant.careSchedule.fertilizing.nextDue) {
        if (plant.careSchedule.fertilizing.nextDue <= now) {
          reminders.push({
            plantId: plant._id,
            plantName: plant.name,
            action: "fertilizing",
            dueDate: plant.careSchedule.fertilizing.nextDue,
            overdue: true,
            urgency: "medium",
          });
        } else if (plant.careSchedule.fertilizing.nextDue <= threeDaysFromNow) {
          reminders.push({
            plantId: plant._id,
            plantName: plant.name,
            action: "fertilizing",
            dueDate: plant.careSchedule.fertilizing.nextDue,
            overdue: false,
            urgency: "low",
          });
        }
      }

      // Check pruning
      if (plant.careSchedule.pruning.nextDue) {
        if (plant.careSchedule.pruning.nextDue <= now) {
          reminders.push({
            plantId: plant._id,
            plantName: plant.name,
            action: "pruning",
            dueDate: plant.careSchedule.pruning.nextDue,
            overdue: true,
            urgency: "low",
          });
        } else if (plant.careSchedule.pruning.nextDue <= threeDaysFromNow) {
          reminders.push({
            plantId: plant._id,
            plantName: plant.name,
            action: "pruning",
            dueDate: plant.careSchedule.pruning.nextDue,
            overdue: false,
            urgency: "low",
          });
        }
      }
    });

    // Sort by urgency and due date
    reminders.sort((a, b) => {
      const urgencyOrder = { high: 3, medium: 2, low: 1 };
      if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency]) {
        return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
      }

      // Fix: avoid crash if dueDate is missing
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;

      return new Date(a.dueDate) - new Date(b.dueDate);
    });

    res.json(reminders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching care reminders", error: error.message });
  }
});

// Log care action
router.post("/:plantId/care-log", verifyToken, async (req, res) => {
  try {
    const { action, notes } = req.body;
    const plant = await OwnedPlant.findOne({
      _id: req.params.plantId,
      owner: req.userId,
    });

    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    // Add care log entry
    plant.careLog.push({
      action,
      notes,
      date: new Date(),
    });

    // Update care schedule based on action
    const now = new Date();
    if (action === "watered") {
      plant.careSchedule.watering.lastDone = now;
    } else if (action === "fertilized") {
      plant.careSchedule.fertilizing.lastDone = now;
    } else if (action === "pruned") {
      plant.careSchedule.pruning.lastDone = now;
    }
    plant.markModified("careSchedule");
    await plant.save();

    res.json({
      message: "Care action logged successfully",
      careLog: plant.careLog[plant.careLog.length - 1],
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging care action", error: error.message });
  }
});

// Update plant health status
router.put("/:plantId/health", verifyToken, async (req, res) => {
  try {
    const { status, healthScore, notes } = req.body;
    const plant = await OwnedPlant.findOne({
      _id: req.params.plantId,
      owner: req.userId,
    });

    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    if (status) plant.status = status;
    if (healthScore !== undefined) plant.healthScore = healthScore;
    if (notes) plant.notes = notes;
    plant.lastHealthUpdate = new Date();

    await plant.save();

    res.json({ message: "Plant health updated successfully", plant });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating plant health", error: error.message });
  }
});

// Update care schedule
router.put("/:plantId/care-schedule", verifyToken, async (req, res) => {
  try {
    const { watering, fertilizing, pruning } = req.body;
    const plant = await OwnedPlant.findOne({
      _id: req.params.plantId,
      owner: req.userId,
    });

    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    if (watering) {
      plant.careSchedule.watering = {
        ...plant.careSchedule.watering,
        ...watering,
      };
    }
    if (fertilizing) {
      plant.careSchedule.fertilizing = {
        ...plant.careSchedule.fertilizing,
        ...fertilizing,
      };
    }
    if (pruning) {
      plant.careSchedule.pruning = {
        ...plant.careSchedule.pruning,
        ...pruning,
      };
    }

    await plant.save();

    res.json({
      message: "Care schedule updated successfully",
      careSchedule: plant.careSchedule,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating care schedule", error: error.message });
  }
});

// Get detailed plant health data
router.get("/:plantId/health-details", verifyToken, async (req, res) => {
  try {
    const plant = await OwnedPlant.findOne({
      _id: req.params.plantId,
      owner: req.userId,
    });

    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    // Get care log for last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentCareLog = plant.careLog.filter(
      (log) => log.date >= thirtyDaysAgo
    );

    // Calculate care frequency stats
    const careStats = {
      wateringCount: recentCareLog.filter((log) => log.action === "watered")
        .length,
      fertilizingCount: recentCareLog.filter(
        (log) => log.action === "fertilized"
      ).length,
      pruningCount: recentCareLog.filter((log) => log.action === "pruned")
        .length,
      totalCareActions: recentCareLog.length,
    };

    res.json({
      plant: {
        _id: plant._id,
        name: plant.name,
        species: plant.species,
        status: plant.status,
        healthScore: plant.healthScore,
        location: plant.location,
        careSchedule: plant.careSchedule,
        notes: plant.notes,
        lastHealthUpdate: plant.lastHealthUpdate,
        datePlanted: plant.datePlanted,
      },
      recentCareLog,
      careStats,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching plant health details",
        error: error.message,
      });
  }
});

module.exports = router;
