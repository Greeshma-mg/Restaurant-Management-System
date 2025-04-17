import React, { useState } from "react";
import "../assets/EditMenu.css";
import { useMenu } from "../context/MenuContext";

const EditMenu = () => {
  // Get API URL from environment variable instead of hardcoded localhost
  const backendURL = import.meta.env.VITE_API_URL?.replace('/api', '') || "http://localhost:5000";
  
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem, isLoading, fetchMenuItems } = useMenu();
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    isAvailable: true,
    image: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingImage, setExistingImage] = useState(null);

  const categories = ["starters", "rice-breads", "desserts", "beverages", "main-course", "combo-meals"];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB!");
      return;
    }
    setNewItem((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
  
    console.log("🚀 handleSubmit triggered!");
  
    if (!newItem.name || !newItem.price || !newItem.category) {
      alert("Name, Price, and Category are required!");
      return;
    }
  
    const price = parseFloat(newItem.price);
    if (isNaN(price) || price < 0) {
      alert("Please enter a valid price!");
      return;
    }
  
    setIsSubmitting(true);
  
    const formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("description", newItem.description || "");
    formData.append("price", price);
    formData.append("category", newItem.category);
    formData.append("isAvailable", newItem.isAvailable);
    if (newItem.image) {
      formData.append("image", newItem.image);
    }
  
    try {
      if (editMode) {
        await updateMenuItem(editItemId, formData);
        setEditMode(false);
        setEditItemId(null);
      } else {
        await addMenuItem(formData);
      }
  
      console.log("✅ Item added/updated successfully!");
      
      // No need to call fetchMenuItems here as it's already called in addMenuItem and updateMenuItem
      
      resetForm();
    } catch (error) {
      console.error("❌ Error adding/updating menu item:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      try {
        await deleteMenuItem(id);
      } catch (error) {
        console.error("Error deleting menu item:", error);
      }
    }
  };

  const handleEditItem = (item) => {
    setNewItem({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      isAvailable: item.isAvailable,
      image: null,
    });
    setExistingImage(item.image ? `${backendURL}/uploads/${item.image}` : null);
    setEditMode(true);
    setEditItemId(item._id || item.id);
  };

  const resetForm = () => {
    setNewItem({
      name: "",
      description: "",
      price: "",
      category: "",
      isAvailable: true,
      image: null,
    });
    setExistingImage(null);
    setEditMode(false);
    setEditItemId(null);
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleBack = () => {
    window.history.back();
  };

  if (isLoading) {
    return <div className="loading">Loading menu data...</div>;
  }

  return (
    <div className="edit-menu-container">
      <button className="back-button" onClick={handleBack}>← Back</button>
      <h1>Edit Restaurant Menu</h1>

      <form onSubmit={handleSubmit} className="menu-form" encType="multipart/form-data">
        <input type="text" name="name" value={newItem.name} onChange={handleInputChange} required placeholder="Item Name" />
        <textarea name="description" value={newItem.description} onChange={handleInputChange} required placeholder="Description" />
        <input type="number" name="price" value={newItem.price} onChange={handleInputChange} required placeholder="Price ($)" />
        <select name="category" value={newItem.category} onChange={handleInputChange} required>
          <option value="">-- Select Category --</option>
          {categories.map((category) => <option key={category} value={category}>{category}</option>)}
        </select>
        <input type="file" name="image" accept="image/*" onChange={handleImageUpload} required={!editMode} />
        {editMode && existingImage && <img src={existingImage} alt="Current" width="100" />}
        <button type="submit" disabled={isSubmitting}>{editMode ? "Update Item" : "Add Item"}</button>
        {editMode && <button type="button" onClick={handleCancelEdit}>Cancel</button>}
      </form>

      <h2>Existing Menu Items</h2>
      {menuItems.length > 0 ? (
        menuItems.map((item, index) => {
          console.log(`Rendering Menu Item ${index + 1}:`, item);
          return (
            <div key={item._id || item.id} className="menu-item">
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Price:</strong> ${item.price}</p>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Available:</strong> {item.isAvailable ? "Yes" : "No"}</p>
              {item.image && <img src={`${backendURL}/uploads/${item.image}`} alt={item.name} width="100" />}
              <button onClick={() => handleEditItem(item)}>Edit</button>
              <button onClick={() => handleDeleteItem(item._id || item.id)}>Delete</button>
            </div>
          );
        })
      ) : (
        <p>No menu items found.</p>
      )}
    </div>
  );
};

export default EditMenu;