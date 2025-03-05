import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/"> RestaurantPro</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/reservation">Reservation</Link></li>
        <li><Link to="/order">Order</Link></li>
        <li><Link to="/review">Reviews</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/login" className="login-btn">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
