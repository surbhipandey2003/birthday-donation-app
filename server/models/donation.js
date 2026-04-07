const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
});


module.exports = mongoose.models.Donation || mongoose.model("Donation", donationSchema);