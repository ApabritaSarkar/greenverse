// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const OwnedPlant = require('../models/OwnedPlant');

// // Get plants along with user details for a specific user
// router.get('/:userId', async (req, res) => {
//     try {
//         const plants = await OwnedPlant.find({ userId: req.params.userId });

//         // Fetch user details
//         const user = await User.findById(req.params.userId).select('username email');

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json({ user, plants });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching profile data', error });
//     }
// });


// // Add a new plant
// router.post('/', async (req, res) => {
//     try {
//         const { userId, name, datePlanted, status } = req.body;
//         const newPlant = new OwnedPlant({ userId, name, datePlanted, status });
//         await newPlant.save();
//         res.status(201).json(newPlant);
//     } catch (error) {
//         res.status(500).json({ message: 'Error adding plant', error });
//     }
// });

// // Delete a plant
// router.delete('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         await OwnedPlant.findByIdAndDelete(id);
//         res.status(200).json({ message: 'Plant deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting plant', error });
//     }
// });

// module.exports = router;
