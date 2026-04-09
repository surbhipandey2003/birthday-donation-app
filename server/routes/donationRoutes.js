const express = require("express");
const router = express.Router();
const { addDonation, getDonations } = require("../controllers/donationController");
const protect = require("../middleware/authmiddleware");

// Protected route
router.get('/donations', getDonations);
router.post('/donations', protect, addDonation);

module.exports = router;