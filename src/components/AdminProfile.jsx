import React from 'react';
import { useNavigate } from "react-router-dom";
import "../assets/Profile.css";

const AdminProfile = () => {
  const navigate = useNavigate();


  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Hari",
    role: "admin",
    email: "Hari12@gmail.com",
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h3>RestaurantPro</h3>
          <button onClick={() => navigate("/admin")} className="back-btn">
            Back to Dashboard
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li className="nav-item" onClick={() => navigate("/admin")}>
              <span className="nav-icon">📊</span>
              <span className="nav-text">Dashboard</span>
            </li>
            <li className="nav-item" onClick={() => navigate("/manage-orders")}>
              <span className="nav-icon">📝</span>
              <span className="nav-text">Manage Orders</span>
            </li>
            <li className="nav-item active" onClick={() => navigate("/admin/profile")}>
              <span className="nav-icon">👤</span>
              <span className="nav-text">Profile</span>
            </li>
            <li className="nav-item" onClick={() => navigate("/admin/settings")}>
              <span className="nav-icon">⚙️</span>
              <span className="nav-text">Settings</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Profile Content */}
      <div className="admin-content">
        <header className="admin-header">
          <h1>Admin Profile</h1>
        </header>

        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2>{user.name}</h2>
            <p>Role: {user.role}</p>
            <p>Email: {user.email}</p>

            <div className="profile-details">
              <div className="detail-item">
                <span className="detail-label">Account Status:</span>
                <span className="detail-value">Active</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Last Login:</span>
                <span className="detail-value">Today at 10:45 AM</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Permissions:</span>
                <span className="detail-value">Full Access</span>
              </div>
            </div>

            <button className="edit-profile-btn">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
