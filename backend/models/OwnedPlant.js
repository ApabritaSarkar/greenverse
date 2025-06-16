const mongoose = require("mongoose");

const ownedPlantSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  datePlanted: { type: Date, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model("OwnedPlant", ownedPlantSchema);
