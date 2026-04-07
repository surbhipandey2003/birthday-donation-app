const Campaign = require("../models/campaign");
const Donation = require("../models/donation");


// CREATE CAMPAIGN
exports.createCampaign = async (req, res) => {
  try {

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { title, description, goalAmount } = req.body;

     if (!req.user) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const campaign = await Campaign.create({
      title,
      description,
      goalAmount,
      createdBy: req.user.id,
      image: req.file?.path,
    });

    res.status(201).json({
      message: "Campaign created successfully",
      campaign,
    });

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// GET ALL CAMPAIGNS
exports.getCampaigns = async (req, res) => {
  try {

    console.log("Fetching campaigns from DB");

    const campaigns = await Campaign.find().populate("createdBy", "name email");

    res.status(200).json(campaigns);

  } catch (error) {
    console.log("FULL ERROR:", error);
    console.log("MESSAGE:", error.message);
    console.log("STACK:", error.stack);
    
    res.status(500).json({ error: error.message });
  }
};

// GET SINGLE CAMPAIGN + TOTAL DONATION
exports.getCampaignById = async (req, res) => {
  try {
    const campaignId = req.params.id;

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    const donations = await Donation.find({ campaign: campaignId })
      .populate("user", "name email");

    const totalAmount = donations.reduce((sum, item) => sum + item.amount, 0);

// 👉 ADD THIS LINE
const remainingAmount = campaign.goalAmount - totalAmount;

res.status(200).json({
  campaign,
  totalCollected: totalAmount,
  remainingAmount,
  donations,
});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
