const MenuItem = require("../models/Menu"); 
const fs = require("fs");
const path = require("path");

const getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch (error) {
    console.error("❌ Error fetching menu items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getItemsByCategory = async (req, res) => {
  try {
    console.log("🔍 Incoming Request Params:", req.params);
    console.log("🔍 Incoming Request Query:", req.query);

    const category = req.params.category?.trim().toLowerCase() || req.query.category?.trim().toLowerCase();

    if (!category) {
      console.error("❌ Invalid or missing category");
      return res.status(400).json({ message: "Invalid or missing category" });
    }

    console.log(`🔍 Searching for category: '${category}'`);

    
    const items = await MenuItem.find({ category: new RegExp(`^${category}$`, "i") });

    if (!items.length) {
      console.warn(`⚠️ No items found for category '${category}'`);
      return res.status(404).json({ message: `No items found for category '${category}'` });
    }

    console.log(`✅ Found ${items.length} items for '${category}'`);
    res.status(200).json(items); 
  } catch (error) {
    console.error(`❌ Server Error at getItemsByCategory:`, error);
    res.status(500).json({ message: "Server error. Please try again later.", error: error.message });
  }
};


// ✅ Add a new menu item 
const addMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, isAvailable, featured } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Name, Price, and Category are required!" });
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      return res.status(400).json({ message: "⚠️ Invalid price format!" });
    }

    console.log("Uploaded File:", req.file);

    const imagePath = req.file ? req.file.filename : null;
    console.log("Image path being stored:", imagePath);

    const menuItem = new MenuItem({
      name,
      description: description || "",
      price: parsedPrice,
      category: category.toLowerCase().trim(),
      isAvailable: isAvailable === "true" || isAvailable === true,
      featured: featured === "true" || featured === true,
      image: imagePath,
    });

    await menuItem.save();
    return res.status(201).json({ message: "✅ Menu item added!", menuItem });
  } catch (error) {
    console.error("❌ Error adding menu item:", error);

    if (!res.headersSent) {
      return res.status(500).json({ message: "❌ Server error! Could not add item.", error: error.message });
    }
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };

    if (updateData.category) {
      updateData.category = updateData.category.toLowerCase().trim();
    }

    if (updateData.isAvailable !== undefined) {
      updateData.isAvailable = updateData.isAvailable === "true";
    }
    if (updateData.featured !== undefined) {
      updateData.featured = updateData.featured === "true";
    }

    const oldItem = await MenuItem.findById(id);
    if (!oldItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    if (req.file) {
      updateData.image = `uploads/${req.file.filename}`;

      if (oldItem.image && oldItem.image.startsWith("uploads/")) {
        const oldImagePath = path.join(__dirname, `../${oldItem.image}`);
        try {
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        } catch (err) {
          console.error("❌ Error deleting old image:", err.message);
        }
      }
    } else {
      updateData.image = oldItem.image;
    }

    const updatedItem = await MenuItem.findByIdAndUpdate(id, updateData, { new: true });
    res.json(updatedItem);
  } catch (error) {
    console.error("❌ Error updating menu item:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete a menu item
const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await MenuItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    if (deletedItem.image && deletedItem.image.startsWith("uploads/")) {
      const imagePath = path.join(__dirname, `../${deletedItem.image}`);
      try {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      } catch (err) {
        console.error("❌ Error deleting image:", err.message);
      }
    }

    res.json({ message: "✅ Menu item deleted successfully", deletedItem });
  } catch (error) {
    console.error("❌ Error deleting menu item:", error);
    res.status(500).json({ error: error.message });
  }
};


const getMenuCategories = async (req, res) => {
  try {
    const allCategories = await MenuItem.distinct("category");
    res.json(allCategories.map(cat => cat.trim()));
  } catch (error) {
    console.error("❌ Error fetching menu categories:", error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getMenuItems,
  getItemsByCategory,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenuCategories,
};
