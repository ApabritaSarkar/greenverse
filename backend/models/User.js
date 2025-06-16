const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // ✅ Add the 'plants' field here
    plants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OwnedPlant' // This tells Mongoose which model to use for population
    }]
});

module.exports = mongoose.model('User', userSchema);
