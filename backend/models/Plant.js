const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    plantingDate: { type: Date, required: true },
    status: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // link back to user
});

module.exports = mongoose.model('Plant', plantSchema);
