const express = require("express");
const fs = require("fs");
const path = require("path");

const {
  getMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenuCategories,
  getItemsByCategory,
} = require("../controllers/menuController");

const { protect, isAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

const ensureUploadDir = () => {
  try {
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log("✅ Uploads directory created successfully.");
    }
  } catch (err) {
    console.error("⚠️ Warning: Failed to create uploads directory:", err);
  }
};
ensureUploadDir();

router.get("/", getMenuItems); 
router.get("/categories", getMenuCategories); 

router.get("/category/:category", getItemsByCategory);

router.post("/", protect, isAdmin, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "❌ Image upload failed!" });
    }
    await addMenuItem(req, res);
  } catch (error) {
    console.error("❌ Error adding menu item:", error);
    return res.status(500).json({ message: "❌ Server error!", error: error.message });
  }
});

router.put("/:id", protect, isAdmin, upload.single("image"), updateMenuItem);
router.delete("/:id", protect, isAdmin, deleteMenuItem);

module.exports = router;
