const express = require("express");
const router = express.Router();
const { addDonation } = require("../controllers/donationController");
const protect = require("../middleware/authmiddleware");

// Protected route
router.post("/add", protect, addDonation);

module.exports = router;