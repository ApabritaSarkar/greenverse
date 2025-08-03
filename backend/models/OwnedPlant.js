const mongoose = require("mongoose");

const careLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
    enum: ['watered', 'fertilized', 'pruned', 'repotted', 'rotated', 'other']
  },
  notes: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const careScheduleSchema = new mongoose.Schema({
  watering: {
    frequency: { type: Number, default: 7 }, // days
    lastDone: { type: Date, default: Date.now },
    nextDue: { type: Date }
  },
  fertilizing: {
    frequency: { type: Number, default: 30 }, // days
    lastDone: { type: Date },
    nextDue: { type: Date }
  },
  pruning: {
    frequency: { type: Number, default: 90 }, // days
    lastDone: { type: Date },
    nextDue: { type: Date }
  }
});

const ownedPlantSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  species: { type: String }, // e.g., "Ficus lyrata"
  datePlanted: { type: Date, required: true },
  status: { 
    type: String, 
    required: true,
    enum: ['thriving', 'healthy', 'needs_attention', 'critical', 'dormant']
  },
  healthScore: {
    type: Number,
    default: 100,
    min: 0,
    max: 100
  },
  location: {
    type: String, // e.g., "Living room window"
  },
  careSchedule: {
    type: careScheduleSchema,
    default: () => ({})
  },
  careLog: [careLogSchema],
  notes: {
    type: String,
    trim: true
  },
  photoUrls: [{
    url: String,
    uploadDate: { type: Date, default: Date.now },
    description: String
  }],
  lastHealthUpdate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Calculate next due dates before saving
ownedPlantSchema.pre('save', function(next) {
  const now = new Date();

  // WATERS
  if (!this.careSchedule.watering.lastDone) {
    this.careSchedule.watering.lastDone = now;
  }
  if (this.careSchedule.watering.frequency) {
    this.careSchedule.watering.nextDue = new Date(
      this.careSchedule.watering.lastDone.getTime() +
      this.careSchedule.watering.frequency * 24 * 60 * 60 * 1000
    );
  }

  // FERTILIZE
  if (!this.careSchedule.fertilizing.lastDone) {
    this.careSchedule.fertilizing.lastDone = now;
  }
  if (this.careSchedule.fertilizing.frequency) {
    this.careSchedule.fertilizing.nextDue = new Date(
      this.careSchedule.fertilizing.lastDone.getTime() +
      this.careSchedule.fertilizing.frequency * 24 * 60 * 60 * 1000
    );
  }

  // PRUNE
  if (!this.careSchedule.pruning.lastDone) {
    this.careSchedule.pruning.lastDone = now;
  }
  if (this.careSchedule.pruning.frequency) {
    this.careSchedule.pruning.nextDue = new Date(
      this.careSchedule.pruning.lastDone.getTime() +
      this.careSchedule.pruning.frequency * 24 * 60 * 60 * 1000
    );
  }

  next();
});


module.exports = mongoose.model("OwnedPlant", ownedPlantSchema);