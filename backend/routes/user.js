const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const OwnedPlant = require("../models/OwnedPlant");
const nodemailer = require("nodemailer");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
require("dotenv").config();

// Temporary in-memory user storage for OTP verification
const tempUsers = {};

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Your email
    pass: process.env.PASSWORD, // Your email app password
  },
});

// Utility function to generate a 6-digit OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Register route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    tempUsers[email] = {
      username,
      email,
      password: hashedPassword,
      otp,
      otpExpires: Date.now() + 15 * 60 * 1000, // OTP valid for 15 minutes
    };

    await transporter.sendMail({
      to: email,
      subject: "Verify Your Email",
      text: `Your OTP is: ${otp}`,
    });

    res.status(201).json({ message: "Registration in progress... OTP sent!" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Registration failed. Please try again." });
  }
});

// OTP verification route
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const tempUser = tempUsers[email];

    if (!tempUser || tempUser.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    if (tempUser.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Save new user to DB
    const newUser = new User({
      username: tempUser.username,
      email: tempUser.email,
      password: tempUser.password,
    });

    await newUser.save();
    delete tempUsers[email]; // Clear OTP cache

    // Sign JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .status(200)
      .json({ message: "OTP verified. User registered and logged in.", token: token });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("ENV SECRET:", process.env.JWT_SECRET);
    console.log("User ID:", user._id);
    res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Profile route
router.get("/profile", verifyToken, async (req, res) => {
  try {
    console.log("Fetching profile for userId:", req.userId);

    const user = await User.findById(req.userId).populate("plants");
    if (!user) {
      console.log("User not found for ID:", req.userId);
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      username: user.username,
      email: user.email,
      plants: user.plants || [],
      _id: user._id,
    });
  } catch (err) {
    console.error("Profile fetch error in route:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/add-plant", verifyToken, async (req, res) => {
  try {
    const {
      name,
      datePlanted,
      status,
      species,
      location,
      wateringFrequency,
      wateringLastDone,
      fertilizingFrequency,
      fertilizingLastDone,
      pruningFrequency,
      pruningLastDone
    } = req.body;

    // Validate required fields
    if (!name || !datePlanted || !status) {
      return res.status(400).json({ 
        message: "Name, date planted, and status are required" 
      });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Parse dates safely
    const parsedDatePlanted = new Date(datePlanted);
    if (isNaN(parsedDatePlanted.getTime())) {
      return res.status(400).json({ message: "Invalid date planted" });
    }

    const now = new Date();
    
    // Parse optional last done dates
    const parseOptionalDate = (dateStr) => {
      if (!dateStr) return now;
      const parsed = new Date(dateStr);
      return isNaN(parsed.getTime()) ? now : parsed;
    };

    const newPlant = new OwnedPlant({
      name,
      datePlanted: parsedDatePlanted,
      status,
      species: species || undefined,
      location: location || undefined,
      owner: user._id,
      careSchedule: {
        watering: {
          frequency: parseInt(wateringFrequency) || 7,
          lastDone: parseOptionalDate(wateringLastDone)
        },
        fertilizing: {
          frequency: parseInt(fertilizingFrequency) || 30,
          lastDone: parseOptionalDate(fertilizingLastDone)
        },
        pruning: {
          frequency: parseInt(pruningFrequency) || 90,
          lastDone: parseOptionalDate(pruningLastDone)
        }
      }
    });

    await newPlant.save(); // `.pre('save')` will auto-calculate nextDue

    // Add to user's plants array
    user.plants = user.plants || [];
    user.plants.push(newPlant._id);
    await user.save();

    res.status(201).json({
      message: "Plant added successfully",
      plant: newPlant
    });

  } catch (err) {
    console.error("Add plant error:", err);
    res.status(500).json({ 
      message: "Server error", 
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
});


module.exports = router;