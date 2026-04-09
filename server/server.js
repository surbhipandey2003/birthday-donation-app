const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const campaignRoutes = require("./routes/campaignRoutes");
app.use("/api/campaigns", campaignRoutes);

const donationRoutes = require("./routes/donationRoutes");
app.use("/api", donationRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Birthday Donation API Running 🚀");
});

const PORT = process.env.PORT || 5000;

// ✅ Correct way
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.log("MongoDB Connection Error:", error);
  }
};

startServer();