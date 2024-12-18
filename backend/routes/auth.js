// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate an OTP and set its expiration
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
        const otpExpires = Date.now() + 15 * 60 * 1000; // 15 minutes expiration

        // Send OTP via email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'jhuma9475946465@gmail.com', // your email
                pass: 'lgce fmod ifpc pbzp', // your email password
            },
        });

        // Send the email
        await transporter.sendMail({
            to: email,
            subject: 'Verify Your Email',
            text: `Your OTP is: ${otp}`,
        });

        // Store the OTP and expiration in a temporary user object
        const temporaryUser = {
            username,
            email,
            password: hashedPassword,
            otp,
            otpExpires,
        };

        // Save temporary user in-memory (you can use a cache or any temporary storage)
        // Example: Use a global array (for demonstration purposes)
        // In a production application, consider using a database or cache for this
        global.tempUsers = global.tempUsers || [];
        global.tempUsers.push(temporaryUser);

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
        // Find the temporary user
        const userIndex = global.tempUsers.findIndex(user => user.email === email);

        if (userIndex === -1) {
            return res.status(400).json({ message: 'User not found or OTP not sent' });
        }

        const user = global.tempUsers[userIndex];

        // Check if the OTP matches and has not expired
        if (user.otp === otp && user.otpExpires > Date.now()) {
            // OTP is valid, proceed to create the user in the database
            const newUser = new User({
                username: user.username,
                email: user.email,
                password: user.password,
            });

            await newUser.save();

            // Clear OTP from temporary storage
            global.tempUsers.splice(userIndex, 1); // Remove the user from temporary storage

            res.status(200).json({ message: 'OTP verified successfully. User registered.' });
        } else {
            res.status(400).json({ message: 'Invalid or expired OTP' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }

    console.log("User's OTP:", user.otp);
    console.log("Provided OTP:", otp);
    console.log("OTP Expiration:", user.otpExpires, "Current Time:", Date.now());
});


// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Send success response and redirect URL
        res.status(200).json({ message: 'Login successful', redirectTo: '/home' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
