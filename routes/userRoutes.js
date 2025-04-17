const express = require("express");

const {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  checkAdmin,
  updateUser,
  deleteUser,
  getUsers, 
} = require("../controllers/userController");

const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);


router.get("/profile", protect, getProfile);
router.get("/admin", protect, isAdmin, checkAdmin);


router.get("/", protect, isAdmin, getUsers); 
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, isAdmin, deleteUser);

module.exports = router;
