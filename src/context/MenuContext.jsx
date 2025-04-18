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

      const predefined = [
        "starters",
        "rice-breads",
        "desserts",
        "beverages",
        "main-course",
        "combo-meals",
      ];
      const fromAPI = [...new Set(data.map((i) => i.category))];
      setCategories(
        [...predefined, ...fromAPI].filter((c, i, self) => c && self.indexOf(c) === i)
      );
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
      await API.post("/menu", formData); // Let Axios handle Content-Type
      await fetchMenuItems();
    } catch (error) {
      if (error.response) {
        console.error("Add Menu - Server error:", error.response.data);
      } else if (error.request) {
        console.error("Add Menu - No response received:", error.request);
      } else {
        console.error("Add Menu - Request error:", error.message);
      }
    }
  };

  const updateMenuItem = async (id, formData) => {
    try {
      await API.put(`/menu/${id}`, formData); // Let Axios handle Content-Type
      await fetchMenuItems();
    } catch (error) {
      if (error.response) {
        console.error("Update Menu - Server error:", error.response.data);
      } else if (error.request) {
        console.error("Update Menu - No response received:", error.request);
      } else {
        console.error("Update Menu - Request error:", error.message);
      }
    }
  };

  const deleteMenuItem = async (id) => {
    try {
      await API.delete(`/menu/${id}`);
      setMenuItems((mi) => mi.filter((i) => (i._id || i.id) !== id));
    } catch (error) {
      if (error.response) {
        console.error("Delete Menu - Server error:", error.response.data);
      } else if (error.request) {
        console.error("Delete Menu - No response received:", error.request);
      } else {
        console.error("Delete Menu - Request error:", error.message);
      }
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
