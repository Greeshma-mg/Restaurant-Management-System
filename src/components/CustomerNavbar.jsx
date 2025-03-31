import { Link, useNavigate } from "react-router-dom";
import "../assets/navbar.css";
import logoImage from "/images/logo2.png";
import React, { useMemo, useCallback, useState, useEffect } from "react";

const CustomerNavbar = React.memo(() => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    setIsLoading(false);
  }, []);

  const handleMyOrders = useCallback(() => {
    navigate("/orders");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); 
    navigate("/login");
  };

  const navbarUI = useMemo(() => {
    if (isLoading) return null;

    return (
      <nav className="navbar">
        <div className="logo-container">
          <img src={logoImage} alt="Savory Elegance Logo" className="logo-image" />
          <h1 className="logo">Savory Elegance</h1>
        </div>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>

          {user ? (
            <>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/reservations">Reservations</Link></li>
              <li>
                <button className="nav-button" onClick={handleMyOrders}>
                  My Orders
                </button>
              </li>
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li><Link to="/login" className="login-btn">Login</Link></li>
          )}
        </ul>
      </nav>
    );
  }, [user, handleMyOrders, isLoading]);

  return navbarUI;
});

CustomerNavbar.displayName = 'CustomerNavbar';
export default CustomerNavbar;
