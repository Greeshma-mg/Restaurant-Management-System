const Menu = require("../models/Menu"); // ✅ Ensure the model is imported

// ✅ Get all menu items
exports.getMenu = async (req, res) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Add a new menu item
exports.addMenuItem = async (req, res) => {
  try {
    const { name, price, category, description, imageUrl } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Name, price, and category are required" });
    }

    const menuItem = new Menu({
      name,
      price,
      category,
      description,
      imageUrl,
    });

    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (error) {
    console.error("Error adding menu item:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update an existing menu item
exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Menu.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete a menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Menu.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ error: error.message });
  }
};
