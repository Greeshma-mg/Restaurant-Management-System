const express = require("express");

const {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  checkAdmin,
  updateUser,
  deleteUser,
  getUsers, // Added getUsers function for fetching all users
} = require("../controllers/userController");

const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Authentication Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Profile & Admin Routes
router.get("/profile", protect, getProfile);
router.get("/admin", protect, isAdmin, checkAdmin);

// User Management Routes
router.get("/", protect, isAdmin, getUsers); // Added route to fetch all users
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, isAdmin, deleteUser);

module.exports = router;
