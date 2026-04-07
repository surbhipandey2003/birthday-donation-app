const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    goalAmount: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    image: {
     type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Campaign || mongoose.model("Campaign", campaignSchema);