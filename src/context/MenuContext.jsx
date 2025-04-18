import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { MenuService } from "../utils/api"; // Import the service, not the API instance

const MenuContext = createContext(null);

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be inside a <MenuProvider>");
  return ctx;
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
      const data = await MenuService.getAllMenus();
      setMenuItems(data);

      const predefined = ["starters", "rice-breads", "desserts", "beverages", "main-course", "combo-meals"];
      const fromAPI = [...new Set(data.map(i => i.category))];
      setCategories([...predefined, ...fromAPI].filter((c, i, self) => c && self.indexOf(c) === i));
    } catch (err) {
      setError(err.message || "Failed to load menu");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  const addMenuItem = async (formData) => {
    try {
      // Use FormData for file uploads
      const formDataObj = new FormData();
      
      // Add all form fields to FormData
      Object.keys(formData).forEach(key => {
        if (key === 'image' && formData[key] instanceof File) {
          formDataObj.append('image', formData[key]);
        } else {
          formDataObj.append(key, formData[key]);
        }
      });
      
      // Use the MenuService instead of direct API calls
      await MenuService.createMenu(formDataObj);
      await fetchMenuItems();
      return true;
    } catch (error) {
      console.error("Add Menu - Server error:", error);
      return false;
    }
  };

  const updateMenuItem = async (id, formData) => {
    try {
      // Use FormData for file uploads
      const formDataObj = new FormData();
      
      // Add all form fields to FormData
      Object.keys(formData).forEach(key => {
        if (key === 'image' && formData[key] instanceof File) {
          formDataObj.append('image', formData[key]);
        } else {
          formDataObj.append(key, formData[key]);
        }
      });
      
      await MenuService.updateMenu(id, formDataObj);
      await fetchMenuItems();
      return true;
    } catch (error) {
      console.error("Update Menu - Server error:", error);
      return false;
    }
  };

  const deleteMenuItem = async (id) => {
    try {
      await MenuService.deleteMenu(id);
      setMenuItems((mi) => mi.filter((i) => i._id !== id));
      return true;
    } catch (error) {
      console.error("Delete Menu - Server error:", error);
      return false;
    }
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        categories,
        isLoading,
        error,
        fetchMenuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}