const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
  try {
    let token;

    // ✅ Check header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // ✅ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Get user from DB (IMPORTANT)
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // ✅ Attach user to request
      req.user = user;

      next();
    } else {
      return res.status(401).json({ message: "No token, not authorized" });
    }

  } catch (error) {
    console.log("AUTH ERROR:", error);
    return res.status(401).json({ message: "Token failed" });
  }
};

module.exports = protect;