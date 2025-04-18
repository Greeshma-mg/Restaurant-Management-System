import axios from "axios";

// Backend URL from .env or fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
console.log("✅ Backend URL:", API_BASE_URL);

// Create Axios instance
const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to every request if available
API.interceptors.request.use((config) => {
  try {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  } catch (err) {
    console.error("❌ Token Parsing Error:", err);
  }
  return config;
});

// Global error handler
const handleError = (error) => {
  if (error.response) {
    console.error(`❌ API Error (${error.response.status}):`, error.response.data);

    // Optional auto logout on 401
    if (error.response.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error.response.data);
  } else if (error.request) {
    console.error("❌ No Response from Server:", error.request);
    return Promise.reject({ message: "No response from server" });
  } else {
    console.error("❌ Error:", error.message);
    return Promise.reject({ message: error.message });
  }
};

// -------- Menu Service --------
export const MenuService = {
  getAllMenus: () => API.get("/menu").then(r => r.data).catch(handleError),
  getAllCategories: () => API.get("/menu/categories").then(r => r.data).catch(handleError),
  getItemsByCategory: (cat) => API.get(`/menu/category/${cat}`).then(r => r.data).catch(handleError),
  getItem: (id) => API.get(`/menu/item/${id}`).then(r => r.data).catch(handleError),
  createMenu: (data) =>
    API.post("/menu", data, {
      headers: data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
    }).then(r => r.data).catch(handleError),
  updateMenu: (id, data) =>
    API.put(`/menu/${id}`, data, {
      headers: data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
    }).then(r => r.data).catch(handleError),
  deleteMenu: (id) => API.delete(`/menu/${id}`).then(r => r.data).catch(handleError),
};

// -------- Order Service --------
export const OrderService = {
  getAllOrders: () => API.get("/orders").then(r => r.data).catch(handleError),
  getOrderById: (id) => API.get(`/orders/${id}`).then(r => r.data).catch(handleError),
  createOrder: (o) => API.post("/orders", o).then(r => r.data).catch(handleError),
  updateOrderStatus: (id, s) => API.patch(`/orders/${id}/status`, s).then(r => r.data).catch(handleError),
  deleteOrder: (id) => API.delete(`/orders/${id}`).then(r => r.data).catch(handleError),
  getOrderHistory: () => API.get("/orders/history").then(r => r.data).catch(handleError),
};

// -------- Reservation Service --------
export const ReservationService = {
  getAllReservations: () => API.get("/reservations").then(r => r.data).catch(handleError),
  getReservationById: (id) => API.get(`/reservations/${id}`).then(r => r.data).catch(handleError),
  createReservation: (d) => API.post("/reservations", d).then(r => r.data).catch(handleError),
  updateReservation: (id, d) => API.patch(`/reservations/${id}`, d).then(r => r.data).catch(handleError),
  deleteReservation: (id) => API.delete(`/reservations/${id}`).then(r => r.data).catch(handleError),
  getAvailableTimes: (date) =>
    API.get("/reservations/available", { params: { date } }).then(r => r.data).catch(handleError),
};

// -------- Payment Service --------
export const PaymentService = {
  getAllPayments: () => API.get("/payments").then(r => r.data).catch(handleError),
  getPaymentById: (id) => API.get(`/payments/${id}`).then(r => r.data).catch(handleError),
  createPayment: (d) => API.post("/payments", d).then(r => r.data).catch(handleError),
  updatePayment: (id, d) => API.patch(`/payments/${id}`, d).then(r => r.data).catch(handleError),
  deletePayment: (id) => API.delete(`/payments/${id}`).then(r => r.data).catch(handleError),
};

// -------- Review Service --------
export const ReviewService = {
  getAllReviews: () => API.get("/reviews").then(r => r.data).catch(handleError),
  getReviewById: (id) => API.get(`/reviews/${id}`).then(r => r.data).catch(handleError),
  createReview: (d) => API.post("/reviews", d).then(r => r.data).catch(handleError),
  updateReview: (id, d) => API.patch(`/reviews/${id}`, d).then(r => r.data).catch(handleError),
  deleteReview: (id) => API.delete(`/reviews/${id}`).then(r => r.data).catch(handleError),
};

// -------- Auth Service --------
export const AuthService = {
  login: (creds) => API.post("/users/login", creds).then(r => r.data).catch(handleError),
  register: (u) => API.post("/users/register", u).then(r => r.data).catch(handleError),
  getUserProfile: () => API.get("/users/profile").then(r => r.data).catch(handleError),
  updateProfile: (u) => API.patch("/users/profile", u).then(r => r.data).catch(handleError),
  logout: () => {
    localStorage.removeItem("user");
    return Promise.resolve();
  },
};

// Default export for custom requests
export default API;
