const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Protect Routes - Check if user has a valid token
exports.protect = async (req, res, next) => {
  let token;

  // Check if token exists in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extract token

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user from DB (excluding password) and attach to request object
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Move to the next middleware or controller
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized! Invalid token." });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized! No token found." });
  }
};

// ✅ Admin Role Middleware - Check if user is an Admin
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // Move to the next middleware or controller
  } else {
    return res.status(403).json({ message: "Access Denied! Admins only." });
  }
};
