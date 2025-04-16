import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://restaurant-management-system-e4ms.onrender.com/api";

const API = axios.create({
  baseURL: API_BASE_URL, 
});

API.interceptors.request.use((req) => {
  try {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    if (user && user.token) {
      req.headers.Authorization = `Bearer ${user.token}`;
    }
  } catch (error) {
    console.error("❌ Error parsing user data from localStorage:", error);
  }
  return req;
});

export const fetchMenuItems = async () => {
  try {
    const response = await API.get("/menu");
    console.log("✅ Menu Items:", response.data);
  } catch (error) {
    console.error("❌ Error fetching menu:", error.response ? error.response.data : error.message);
  }
};

export default API;
