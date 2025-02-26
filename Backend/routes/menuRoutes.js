const express = require("express");
const {
  getMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuController"); 
const { protect, isAdmin } = require("../middleware/authMiddleware"); 

const router = express.Router();


router.get("/", getMenu);
router.post("/", protect, isAdmin, addMenuItem);
router.put("/:id", protect, isAdmin, updateMenuItem);
router.delete("/:id", protect, isAdmin, deleteMenuItem);

module.exports = router; 