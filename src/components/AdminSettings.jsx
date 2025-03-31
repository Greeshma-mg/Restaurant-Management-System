import React from 'react';
import { useNavigate } from "react-router-dom";
import "../assets/profile.css";
const AdminSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h3>RestaurantPro</h3>
          <button onClick={() => navigate("/admin")} className="back-btn">Back to Dashboard</button>
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
            <li className="nav-item" onClick={() => navigate("/admin/profile")}>
              <span className="nav-icon">👤</span>
              <span className="nav-text">Profile</span>
            </li>
            <li className="nav-item active" onClick={() => navigate("/admin/settings")}>
              <span className="nav-icon">⚙️</span>
              <span className="nav-text">Settings</span>
            </li>
          </ul>
        </nav>
      </div>

      <div className="admin-content">
        <header className="admin-header">
          <h1>Admin Settings</h1>
        </header>
        
        <div className="settings-content">
          <div className="settings-card">
            <h3>System Settings</h3>
            <div className="settings-form">
              <div className="form-group">
                <label>Restaurant Name</label>
                <input type="text" defaultValue="RestaurantPro" />
              </div>
              <div className="form-group">
                <label>Email Notifications</label>
                <select defaultValue="all">
                  <option value="all">All Notifications</option>
                  <option value="important">Important Only</option>
                  <option value="none">None</option>
                </select>
              </div>
              <div className="form-group">
                <label>Automatic Logout</label>
                <select defaultValue="30">
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="never">Never</option>
                </select>
              </div>
              <button className="save-settings-btn">Save Settings</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;