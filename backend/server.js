// server.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const cors = require('cors'); 
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const registerRoute = require('./routes/auth');


dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', registerRoute);

const users = {};  // Temporarily storing users in memory

// Generate a 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.PASSWORD // Your app password
    }
});

// Route to handle login
app.post('/login', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const otp = generateOTP();
    const hashedOTP = bcrypt.hashSync(otp, 10);  // Hashing OTP for security

    users[email] = { otp: hashedOTP, verified: false };

    console.log(users); // Log the users object


    // Send OTP via email
    transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP for Plant Companion Login',
        text: `Your OTP is ${otp}`
    }, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error sending OTP' });
        }
        res.json({ message: 'OTP sent to your email' });
    });
});

// Route to verify OTP
app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const user = users[email];
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const isValidOTP = bcrypt.compareSync(otp, user.otp);
    if (isValidOTP) {
        user.verified = true;
        delete user.otp; // Clear OTP after successful verification
        res.json({ message: 'Login successful' });
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
});


app.get('/plants', (req, res) => {
    const plants = [
        { name: 'Aloe Vera', description: 'A hardy succulent plant.', category: 'indoor' },
        { name: 'Fern', description: 'A lush, green plant perfect for indoors.', category: 'indoor' },
        { name: 'Basil', description: 'A fragrant herb used in cooking.', category: 'herbal' },
        { name: 'Rose', description: 'A beautiful flowering plant.', category: 'outdoor' },
        { name: 'Snake Plant', description: 'An easy-to-care-for indoor plant.', category: 'indoor' },
        { name: 'Succulent', description: 'Various types of small, fleshy plants.', category: 'gifts' }
    ];
    res.json(plants);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
