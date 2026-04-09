const Donation = require("../models/donation");
const Campaign = require("../models/campaign");

const addDonation = async (req, res) => {
  try {
    const { campaignId, amount } = req.body;

    if (!campaignId || !amount) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Create donation
    const donation = new Donation({
      campaign: campaignId,
      amount,
      user: req.user._id, 
    });

    await donation.save();

    // Update campaign raised amount
    const campaign = await Campaign.findById(campaignId);

    if (campaign) {
      campaign.raisedAmount = (campaign.raisedAmount || 0) + Number(amount);
      await campaign.save();
    }

    res.status(201).json({ message: "Donation successful" });

  } catch (error) {
    console.log(error);  // 🔥 IMPORTANT for debugging
    res.status(500).json({ message: "Server error" });
  }
};

const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addDonation, getDonations};