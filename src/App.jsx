import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MenuProvider } from "./context/MenuContext";
import CustomerNavbar from "./components/CustomerNavbar";
import AdminNavbar from "./components/AdminNavbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import ManageOrders from "./components/ManageOrders";
import Analytics from "./components/Analytics";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./components/ForgotPassword";
import Register from "./components/Register";
import Menu from "./pages/Menu";
import Payment from "./pages/Payment";
import OrderTypeSelection from "./pages/OrderTypeSelection";
import "./assets/styles.css";
import AdminProfile from "./components/AdminProfile";
import AdminSettings from "./components/AdminSettings";
import Reservations from "./pages/Reservations";
import AdminHome from "./components/AdminHome";
import EditMenu from "./components/EditMenu";
import Reviews from "./components/Reviews";
import ManageReservations from "./components/ManageReservations";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser)); 
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user"); 
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  if (isLoading) {
    return <div className="loading">Loading application...</div>;
  }

  return (
    <MenuProvider>
      <>
        {!isLoading && (
          <>
            {user ? (
              user.role === "admin" ? (
                <AdminNavbar onLogout={handleLogout} />
              ) : (
                <CustomerNavbar onLogout={handleLogout} />
              )
            ) : (
              <nav className="navbar">
                <h1 className="logo">RestaurantPro</h1>
                <ul className="nav-links">
                  <li><a href="/">Home</a></li>
                  <li><a href="/login" className="login-btn">Login</a></li>
                </ul>
              </nav>
            )}
          </>
        )}

        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/payment" element={<Payment />} />

          <Route
            path="/"
            element={
              user ? (
                user.role === "admin" ? (
                  <Navigate to="/admin/dashboard" replace />
                ) : (
                  <Home />
                )
              ) : (
                <Home />
              )
            }
          />

          <Route
  path="/dashboard"
  element={<ProtectedRoute allowedRoles={["customer", "manager"]}><Home /></ProtectedRoute>}
/>
<Route
  path="/order-type"
  element={<ProtectedRoute allowedRoles={["customer", "manager"]}><OrderTypeSelection /></ProtectedRoute>}
/>
<Route
  path="/reservations"
  element={<ProtectedRoute allowedRoles={["customer", "manager"]}><Reservations /></ProtectedRoute>}
/>
<Route
  path="/orders"
  element={<ProtectedRoute allowedRoles={["customer", "manager"]}><Orders /></ProtectedRoute>}
/>


          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute allowedRoles={["admin"]}><AdminHome /></ProtectedRoute>}
          />
          <Route
            path="/admin/manage-orders"
            element={<ProtectedRoute allowedRoles={["admin"]}><ManageOrders /></ProtectedRoute>}
          />
          <Route
            path="/admin/manage-reservations"
            element={<ProtectedRoute allowedRoles={["admin"]}><ManageReservations /></ProtectedRoute>}
          />
          <Route
            path="/admin/menu-editor"
            element={<ProtectedRoute allowedRoles={["admin"]}><EditMenu /></ProtectedRoute>}
          />
          <Route
            path="/admin/reviews"
            element={<ProtectedRoute allowedRoles={["admin"]}><Reviews /></ProtectedRoute>}
          />
          <Route
            path="/admin/analytics"
            element={<ProtectedRoute allowedRoles={["admin"]}><Analytics /></ProtectedRoute>}
          />
          <Route
            path="/admin/profile"
            element={<ProtectedRoute allowedRoles={["admin"]}><AdminProfile /></ProtectedRoute>}
          />
          <Route
            path="/admin/settings"
            element={<ProtectedRoute allowedRoles={["admin"]}><AdminSettings /></ProtectedRoute>}
          />

          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/manage-orders" element={<Navigate to="/admin/manage-orders" replace />} />
          <Route path="/manage-reservations" element={<Navigate to="/admin/manage-reservations" replace />} />
          <Route path="/menu-editor" element={<Navigate to="/admin/menu-editor" replace />} />
          <Route path="/reviews" element={<Navigate to="/admin/reviews" replace />} />
          <Route path="/analytics" element={<Navigate to="/admin/analytics" replace />} />
          <Route path="/AdminSettings" element={<Navigate to="/admin/settings" replace />} />
          <Route path="/AdminProfile" element={<Navigate to="/admin/profile" replace />} />
        </Routes>
      </>
    </MenuProvider>
  );
}

export default App;
