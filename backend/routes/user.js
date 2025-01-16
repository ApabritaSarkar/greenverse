const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const OwnedPlant = require('../models/OwnedPlant');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

// Temporary in-memory user storage for OTP verification
const tempUsers = {};

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.PASSWORD // Your email app password
    }
});

// Utility function to generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Register route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOTP();

        tempUsers[email] = {
            username,
            email,
            password: hashedPassword,
            otp,
            otpExpires: Date.now() + 15 * 60 * 1000 // OTP valid for 15 minutes
        };

        await transporter.sendMail({
            to: email,
            subject: 'Verify Your Email',
            text: `Your OTP is: ${otp}`
        });

        res.status(201).json({ message: 'Registration in progress... OTP sent!' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Registration failed. Please try again.' });
    }
});

// OTP verification route
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    try {
        const tempUser = tempUsers[email];

        if (!tempUser || tempUser.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        if (tempUser.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        const newUser = new User({
            username: tempUser.username,
            email: tempUser.email,
            password: tempUser.password
        });

        await newUser.save();
        delete tempUsers[email]; // Clear temporary data after successful registration

        res.status(200).json({ message: 'OTP verified successfully. User registered.' });
    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({
            message: 'Login successful',
            userId: user._id,
            username: user.username,
            email: user.email,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user details and owned plants by email
router.get('/profile', async (req, res) => {
    const { email } = req.query; // Expect email as a query parameter

    try {
        // Fetch the user details
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch the owned plants associated with the user
        const ownedPlants = await OwnedPlant.find({ userId: user._id });

        // Combine user details and owned plants
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            plants: ownedPlants, // Send plant data
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a new plant for the user
router.post('/add-plant', async (req, res) => {
    const { userId, name, datePlanted, status } = req.body;

    try {
        // Validate input
        if (!userId || !name || !datePlanted || !status) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create and save the new plant
        const newPlant = new OwnedPlant({ userId, name, datePlanted, status });
        await newPlant.save();

        // Respond with success
        res.status(201).json({ message: 'Plant added successfully', plant: newPlant });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;