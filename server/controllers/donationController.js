const Donation = require("../models/Donation");
const Campaign = require("../models/Campaign");

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

module.exports = { addDonation };