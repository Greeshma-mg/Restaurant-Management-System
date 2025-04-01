import axios from "axios";

// Dynamically use backend URL from environment or fallback to localhost for development
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
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

const fetchMenuItems = async () => {
  try {
    const response = await API.get("/menu");
    console.log("✅ Menu Items:", response.data);
  } catch (error) {
    console.error("❌ Error fetching menu:", error.response ? error.response.data : error.message);
  }
};

export default API;
