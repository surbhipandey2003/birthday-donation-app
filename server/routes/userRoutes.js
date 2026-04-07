const express = require("express");
const router = express.Router();


const { registerUser, loginUser, getMyCampaigns, getMyDonations } = require("../controllers/userController");
const protect = require("../middleware/authmiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);


// 👉 ADD HERE
router.get("/my-campaigns", protect, getMyCampaigns);
router.get("/my-donations", protect, getMyDonations);

// router.get("/profile", protect, (req, res) => {
//   res.json(req.user);
// });

module.exports = router;