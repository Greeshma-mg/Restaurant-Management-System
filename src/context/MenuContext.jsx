import { createContext, useContext, useState, useEffect, useCallback } from "react";
import API from "../utils/api";

const MenuContext = createContext(null);

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
}

export function MenuProvider({ children }) {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMenuItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await API.get("/menu"); // Axios handles token automatically
      console.log("✅ Processed menu data:", data);
      setMenuItems(data);

      const predefinedCategories = ["starters", "rice-breads", "desserts", "beverages", "main-course", "combo-meals"];
      const extractedCategories = [...new Set(data.map(item => item.category))];
      const mergedCategories = [...predefinedCategories, ...extractedCategories].filter(
        (category, index, self) => category && self.indexOf(category) === index
      );

      setCategories(mergedCategories);
      console.log("✅ Updated Categories:", mergedCategories);

    } catch (error) {
      console.error("❌ Error fetching menu items:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("🔄 MenuProvider: Initial fetch of menu items");
    fetchMenuItems();
  }, [fetchMenuItems]);

  const addMenuItem = async (formData) => {
    try {
      const { data } = await API.post("/menu", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      console.log("✅ Menu Item Added:", data);
      setMenuItems(prevMenu => [...prevMenu, data]);
      await fetchMenuItems();

    } catch (error) {
      console.error("❌ Error adding menu item:", error.message);
      throw error;
    }
  };

  const updateMenuItem = async (id, formData) => {
    try {
      const { data } = await API.put(`/menu/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      console.log("✅ Menu Item Updated:", data);
      setMenuItems(prevMenu => prevMenu.map(item => (item._id === id || item.id === id) ? data : item));
      await fetchMenuItems();

    } catch (error) {
      console.error("❌ Error updating menu item:", error.message);
      throw error;
    }
  };

  const deleteMenuItem = async (id) => {
    try {
      await API.delete(`/menu/${id}`);

      console.log("✅ Menu Item Deleted:", id);
      setMenuItems(prevMenu => prevMenu.filter(item => item._id !== id && item.id !== id));
      await fetchMenuItems();

    } catch (error) {
      console.error("❌ Error deleting menu item:", error.message);
      throw error;
    }
  };

  const value = {
    menuItems,
    categories,
    isLoading,
    error,
    fetchMenuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}
