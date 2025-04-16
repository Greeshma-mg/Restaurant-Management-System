import { createContext, useContext, useState, useEffect, useCallback } from "react";

const API_URL = `${import.meta.env.VITE_API_URL}/api/menu`;
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
      const response = await fetch(`${API_URL}?t=${Date.now()}`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: Failed to fetch menu items`);
      }
      
      const data = await response.json();
      console.log("🔄 Raw API response:", data);
      
      let processedData = [];
      if (Array.isArray(data)) {
        processedData = data;
      } else if (data?.data && Array.isArray(data.data)) {
        processedData = data.data;
      } else {
        throw new Error("Unexpected API response structure");
      }
      
      console.log("✅ Processed menu data:", processedData);
      setMenuItems(processedData);
      
      const predefinedCategories = ["starters", "rice-breads", "desserts", "beverages", "main-course", "combo-meals"];
      const extractedCategories = [...new Set(processedData.map(item => item.category))];
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
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: Failed to add menu item`);
      }
      
      const newItem = await response.json();
      console.log("✅ Menu Item Added:", newItem);
      
      setMenuItems(prevMenu => [...prevMenu, newItem]);
      
      await fetchMenuItems();
      
    } catch (error) {
      console.error("❌ Error adding menu item:", error.message);
      throw error; 
    }
  };

  const updateMenuItem = async (id, formData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: Failed to update menu item`);
      }
      
      const updatedItem = await response.json();
      console.log("✅ Menu Item Updated:", updatedItem);
      
      setMenuItems(prevMenu => 
        prevMenu.map(item => (item._id === id || item.id === id) ? updatedItem : item)
      );
      
      await fetchMenuItems();
      
    } catch (error) {
      console.error("❌ Error updating menu item:", error.message);
      throw error;
    }
  };

  const deleteMenuItem = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: Failed to delete menu item`);
      }
      
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