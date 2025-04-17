import { createContext, useContext, useState, useEffect, useCallback } from "react";
import API from "../utils/api"; 

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
      const { data } = await API.get("/menu");
      setMenuItems(data);

      const predefined = ["starters","rice-breads","desserts","beverages","main-course","combo-meals"];
      const fromAPI = [...new Set(data.map(i => i.category))];
      setCategories([...predefined, ...fromAPI].filter((c,i,self)=>c && self.indexOf(c)===i));
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
      await API.post("/menu", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      await fetchMenuItems();
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };
  
  const updateMenuItem = async (id, formData) => {
    try {
      await API.put(`/menu/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      await fetchMenuItems();
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };
  
  const deleteMenuItem = async (id) => {
    try {
      await API.delete(`/menu/${id}`);
      setMenuItems((mi) => mi.filter((i) => i._id !== id));
    } catch (error) {
      console.error("Error deleting menu item:", error);
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
