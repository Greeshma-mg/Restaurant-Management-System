import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://restaurant-management-system-e4ms.onrender.com/api";

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (req) => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    if (user && user.token) {
      req.headers.Authorization = `Bearer ${user.token}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized. Possible logout triggered.");
    }
    return Promise.reject(error);
  }
);

export const fetchMenuItems = async () => {
  try {
    const response = await API.get("/menu");
    console.log("✅ Menu Items:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error fetching menu:",
      error.response ? error.response.data : error.message
    );
  }
};

export default API;
