import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token on every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  // (Optionally) console.log("🔑 Token:", token);
  if (token && token !== 'null') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralized error handling
const handleError = (error) => {
  if (error.response) {
    console.error(`❌ API Error (${error.response.status}):`, error.response.data);
    if (error.response.status === 401) {
      // token invalid/expired → force logout
      localStorage.removeItem('token');
      // e.g. window.location.href = '/login';
    }
    return Promise.reject(error.response.data);
  } else if (error.request) {
    console.error('❌ No response from server:', error.request);
    return Promise.reject({ message: 'Server did not respond' });
  } else {
    console.error('❌ Request Error:', error.message);
    return Promise.reject({ message: error.message });
  }
};

export const MenuService = {
  getAllMenus:    () => API.get('/menu').then(r => r.data).catch(handleError),
  getAllCategories: () => API.get('/menu/categories').then(r => r.data).catch(handleError),
  getItemsByCategory: (cat) => API.get(`/menu/category/${cat}`).then(r => r.data).catch(handleError),
  createMenu:    (data) => API.post('/menu', data).then(r => r.data).catch(handleError),
  updateMenu:    (id, data) => API.put(`/menu/${id}`, data).then(r => r.data).catch(handleError),
  deleteMenu:    (id) => API.delete(`/menu/${id}`).then(r => r.data).catch(handleError),
  getItem:       (id) => API.get(`/menu/item/${id}`).then(r => r.data).catch(handleError),
};

export const OrderService = {
  getAllOrders:    () => API.get('/orders').then(r => r.data).catch(handleError),
  getOrderById:    (id) => API.get(`/orders/${id}`).then(r => r.data).catch(handleError),
  createOrder:     (o)  => API.post('/orders', o).then(r => r.data).catch(handleError),
  updateOrderStatus: (id,s) => API.patch(`/orders/${id}/status`, s).then(r => r.data).catch(handleError),
  deleteOrder:     (id) => API.delete(`/orders/${id}`).then(r => r.data).catch(handleError),
  getOrderHistory: ()    => API.get('/orders/history').then(r => r.data).catch(handleError),
};

export const ReservationService = {
  getAllReservations:  ()    => API.get('/reservations').then(r => r.data).catch(handleError),
  getReservationById:  (id)  => API.get(`/reservations/${id}`).then(r => r.data).catch(handleError),
  createReservation:   (d)   => API.post('/reservations', d).then(r => r.data).catch(handleError),
  updateReservation:   (id,d) => API.patch(`/reservations/${id}`, d).then(r => r.data).catch(handleError),
  deleteReservation:   (id)  => API.delete(`/reservations/${id}`).then(r => r.data).catch(handleError),
  getAvailableTimes:   (date)=> API.get('/reservations/available',{ params:{ date }}).then(r => r.data).catch(handleError),
};

export const PaymentService = {
  getAllPayments: () => API.get('/payments').then(r => r.data).catch(handleError),
  getPaymentById: (id) => API.get(`/payments/${id}`).then(r => r.data).catch(handleError),
  createPayment:  (d)  => API.post('/payments', d).then(r => r.data).catch(handleError),
  updatePayment:  (id,d)=> API.patch(`/payments/${id}`, d).then(r => r.data).catch(handleError),
  deletePayment:  (id) => API.delete(`/payments/${id}`).then(r => r.data).catch(handleError),
};

export const ReviewService = {
  getAllReviews: () => API.get('/reviews').then(r => r.data).catch(handleError),
  getReviewById: (id) => API.get(`/reviews/${id}`).then(r => r.data).catch(handleError),
  createReview:  (d)  => API.post('/reviews', d).then(r => r.data).catch(handleError),
  updateReview:  (id,d)=> API.patch(`/reviews/${id}`, d).then(r => r.data).catch(handleError),
  deleteReview:  (id) => API.delete(`/reviews/${id}`).then(r => r.data).catch(handleError),
};

export const AuthService = {
  login:       (creds) => API.post('/auth/login', creds).then(r => r.data).catch(handleError),
  register:    (u)     => API.post('/auth/register', u).then(r => r.data).catch(handleError),
  getUserProfile:      ()    => API.get('/auth/profile').then(r => r.data).catch(handleError),
  updateProfile:       (u)   => API.patch('/auth/profile', u).then(r => r.data).catch(handleError),
  logout:       ()     => { localStorage.removeItem('token'); return Promise.resolve(); },
};

export default API;
