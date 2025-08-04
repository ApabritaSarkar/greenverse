const mongoose = require("mongoose");

const careLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
    enum: ["watered", "fertilized", "pruned", "repotted", "rotated", "other"],
  },
  notes: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const careScheduleSchema = new mongoose.Schema({
  watering: {
    frequency: { type: Number, default: 7 },
    lastDone: { type: Date, default: Date.now },
    nextDue: { type: Date },
  },
  fertilizing: {
    frequency: { type: Number, default: 30 },
    lastDone: { type: Date, default: Date.now },
    nextDue: { type: Date },
  },
  pruning: {
    frequency: { type: Number, default: 90 },
    lastDone: { type: Date, default: Date.now },
    nextDue: { type: Date },
  },
});

const ownedPlantSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    species: { type: String },
    datePlanted: { type: Date, required: true },
    status: {
      type: String,
      required: true,
      enum: ["thriving", "healthy", "needs_attention", "critical", "dormant"],
    },
    healthScore: {
      type: Number,
      default: 100,
      min: 0,
      max: 100,
    },
    location: { type: String },
    careSchedule: {
      type: careScheduleSchema,
      default: () => ({}),
    },
    careLog: [careLogSchema],
    notes: { type: String, trim: true },
    photoUrls: [
      {
        url: String,
        uploadDate: { type: Date, default: Date.now },
        description: String,
      },
    ],
    lastHealthUpdate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Calculate next due dates before saving
ownedPlantSchema.pre('save', function (next) {
  const now = new Date();
  const calcNextDue = (lastDone, freq) => {
    if (!lastDone || !freq) return null;
    return new Date(lastDone.getTime() + freq * 24 * 60 * 60 * 1000);
  };

  // Ensure structure
  if (!this.careSchedule) this.careSchedule = {};
  if (!this.careSchedule.watering) this.careSchedule.watering = {};
  if (!this.careSchedule.fertilizing) this.careSchedule.fertilizing = {};
  if (!this.careSchedule.pruning) this.careSchedule.pruning = {};

  // Watering
  const wateringFreq = this.careSchedule.watering.frequency ?? 7;
  const wateringLastDone = this.careSchedule.watering.lastDone ?? now;
  this.careSchedule.watering.frequency = wateringFreq;
  this.careSchedule.watering.lastDone = wateringLastDone;
  this.careSchedule.watering.nextDue = calcNextDue(wateringLastDone, wateringFreq);

  // Fertilizing
  const fertilizingFreq = this.careSchedule.fertilizing.frequency ?? 30;
  const fertilizingLastDone = this.careSchedule.fertilizing.lastDone ?? now;
  this.careSchedule.fertilizing.frequency = fertilizingFreq;
  this.careSchedule.fertilizing.lastDone = fertilizingLastDone;
  this.careSchedule.fertilizing.nextDue = calcNextDue(fertilizingLastDone, fertilizingFreq);

  // Pruning
  const pruningFreq = this.careSchedule.pruning.frequency ?? 90;
  const pruningLastDone = this.careSchedule.pruning.lastDone ?? now;
  this.careSchedule.pruning.frequency = pruningFreq;
  this.careSchedule.pruning.lastDone = pruningLastDone;
  this.careSchedule.pruning.nextDue = calcNextDue(pruningLastDone, pruningFreq);

  next();
});


module.exports = mongoose.model("OwnedPlant", ownedPlantSchema);
