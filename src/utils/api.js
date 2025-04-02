import axios from 'axios';
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && token !== "null") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const MenuService = {
  getAllMenus: async () => {
    try {
      const response = await API.get('/menu');
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
  getAllCategories: async () => {
    try {
      const response = await API.get('/menu/categories'); 
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  getItemsByCategory: async (category) => {
    if (!category) return Promise.reject({ message: "Category is required" });

    const normalizedCategory = category.toLowerCase().trim().replace(/\s+/g, '-').replace(/&/g, 'and');

    try {
      const response = await API.get(`/menu/category/${normalizedCategory}`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  createMenu: (menuData) => API.post('/menu', menuData),
  updateMenu: (id, menuData) => API.put(`/menu/${id}`, menuData),
  deleteMenu: (id) => API.delete(`/menu/${id}`),
  getItem: (id) => API.get(`/menu/item/${id}`),
};

export const OrderService = {
  getAllOrders: () => API.get('/orders'),
  getOrderById: (id) => API.get(`/orders/${id}`),
  createOrder: (orderData) => API.post('/orders', orderData),
  updateOrderStatus: (id, statusData) => API.patch(`/orders/${id}/status`, statusData),
  deleteOrder: (id) => API.delete(`/orders/${id}`),
  getOrderHistory: () => API.get('/orders/history'),
};

// ✅ Define API methods for Reservations
export const ReservationService = {
  getAllReservations: () => API.get('/reservations'),
  getReservationById: (id) => API.get(`/reservations/${id}`),
  createReservation: (reservationData) => API.post('/reservations', reservationData),
  updateReservation: (id, reservationData) => API.patch(`/reservations/${id}`, reservationData),
  deleteReservation: (id) => API.delete(`/reservations/${id}`),
  getAvailableTimes: (date) => API.get('/reservations/available', { params: { date } }),
};

// ✅ Define API methods for Payments
export const PaymentService = {
  getAllPayments: () => API.get('/payments'),
  getPaymentById: (id) => API.get(`/payments/${id}`),
  createPayment: (paymentData) => API.post('/payments', paymentData),
  updatePayment: (id, paymentData) => API.patch(`/payments/${id}`, paymentData),
  deletePayment: (id) => API.delete(`/payments/${id}`),
};

// ✅ Define API methods for Reviews
export const ReviewService = {
  getAllReviews: () => API.get('/reviews'),
  getReviewById: (id) => API.get(`/reviews/${id}`),
  createReview: (reviewData) => API.post('/reviews', reviewData),
  updateReview: (id, reviewData) => API.patch(`/reviews/${id}`, reviewData),
  deleteReview: (id) => API.delete(`/reviews/${id}`),
};

// ✅ Define API methods for Authentication
export const AuthService = {
  login: (credentials) => API.post('/auth/login', credentials),
  register: (userData) => API.post('/auth/register', userData),
  getUserProfile: () => API.get('/auth/profile'),
  updateProfile: (userData) => API.patch('/auth/profile', userData),
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  },
};
const handleError = (error) => {
  if (error.response) {
    console.error(`❌ API Error (${error.response.status}):`, error.response.data);
    return Promise.reject(error.response.data);
  } else if (error.request) {
    console.error("❌ No response from server:", error.request);
    return Promise.reject({ message: "Server did not respond" });
  } else {
    console.error("❌ Request Error:", error.message);
    return Promise.reject({ message: error.message });
  }
};

export default API;
