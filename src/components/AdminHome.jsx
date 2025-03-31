import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../assets/admin-dashboard.css";

const AdminHome = () => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('Running useEffect')
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setIsLoading(false);
      console.log("User data loaded in AdminHome:", storedUser);

      if (storedUser.role !== "admin") {
        console.log("User is not admin, redirecting to customer dashboard");
        navigate("/dashboard");
      }

      if (showWelcome) {
        const welcomeTimer = setTimeout(() => {
          setShowWelcome(false);
        }, 3000);
        return () => clearTimeout(welcomeTimer);
      }
    } else {
      const timer = setTimeout(() => {
        console.log("No user data, redirecting to login");
        navigate("/login");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [navigate, showWelcome]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleUserProfile = () => {
    navigate("/admin/profile");
    setShowUserMenu(false);
  };

  const handleAdminSettings = () => {
    navigate("/admin/settings");
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  if (isLoading) {
    return <div className="loading-screen">Loading...</div>;
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="admin-layout">
      <div className="top-nav-bar"></div>
      {showWelcome && (
        <div className="welcome-toast">
          <div className="toast-content">
            <span className="toast-icon">👋</span>
            <p>Welcome back, {user.name}!</p>
            <button onClick={() => setShowWelcome(false)} className="toast-close">×</button>
          </div>
        </div>
      )}

      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h3>RestaurantPro</h3>
          <div className="profile-container" onClick={toggleUserMenu}>
            <div className="profile-image">
              <div className="profile-placeholder">
                <span>{user.name.charAt(0)}</span>
              </div>
              <div className="online-indicator"></div>
            </div>
            <div className="profile-info">
              <div className="profile-name">{user.name}</div>
              <div className="profile-role">Admin User</div>
            </div>
            {showUserMenu && (
              <div className="profile-dropdown">
                <ul>
                  <li onClick={handleUserProfile}>Profile</li>
                  <li onClick={handleAdminSettings}>Settings</li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li className="nav-item active"><span className="nav-icon">📊</span><span className="nav-text">Dashboard</span></li>
            <li className="nav-item" onClick={() => navigate("/admin/manage-orders")}><span className="nav-icon">📝</span><span className="nav-text">Manage Orders</span></li>
            <li className="nav-item" onClick={() => navigate("/admin/manage-reservations")}><span className="nav-icon">📅</span><span className="nav-text">Manage Reservations</span></li>
            <li className="nav-item" onClick={() => navigate("/admin/menu-editor")}><span className="nav-icon">🍽️</span><span className="nav-text">Edit Menu</span></li>
            <li className="nav-item" onClick={() => navigate("/admin/reviews")}><span className="nav-icon">⭐</span><span className="nav-text">Reviews</span></li>
            <li className="nav-item" onClick={() => navigate("/admin/analytics")}><span className="nav-icon">📈</span><span className="nav-text">Analytics</span></li>
          </ul>
        </nav>
      </div>

      <div className="admin-content">
        <header className="admin-header">
          <div className="header-left">
            <h1>Admin Dashboard</h1>
            <p className="last-login">Last login: {new Date().toLocaleString()}</p>
          </div>
          <div className="header-right">
            <div className="quick-actions">
              <button className="action-button" onClick={() => navigate("/admin/menu-editor")}><span className="action-icon">➕</span> Add Menu Item</button>
              <button className="action-button" onClick={() => navigate("/admin/manage-reservations")}><span className="action-icon">📅</span> Manage Reservations</button>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default AdminHome;
