const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 
const User = require("../models/user");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const user = await User.create({
      name,
      email,
      password : hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
       { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const Campaign = require("../models/campaign");
const Donation = require("../models/donation");

// GET MY CAMPAIGNS
exports.getMyCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ createdBy: req.user.id });

    res.status(200).json(campaigns);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET MY DONATIONS
exports.getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ user: req.user.id })
      .populate("campaign", "title goalAmount");

    res.status(200).json(donations);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};