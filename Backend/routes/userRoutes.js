const express = require("express");
const { registerUser, loginUser, logoutUser, getProfile, checkAdmin } = require("../controllers/userController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes (No Authentication Needed)
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);  // ✅ Added Logout Route

// Protected Routes (Only Logged-in Users)
router.get("/profile", protect, getProfile);  // ✅ Moved to Controller
router.get("/admin", protect, isAdmin, checkAdmin);  // ✅ Moved to Controller

module.exports = router;
