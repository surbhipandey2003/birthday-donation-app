const express = require("express");
const router = express.Router();

const {
  createCampaign,
  getCampaigns,
  getCampaignById
} = require("../controllers/campaignController");

const protect = require("../middleware/authmiddleware");


const upload = require("../middleware/upload");

router.post("/create", protect, upload.single("image"), createCampaign);

// Get all campaigns
router.get("/", getCampaigns);

// Get single campaign
router.get("/:id", getCampaignById);

module.exports = router;