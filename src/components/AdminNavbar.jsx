import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    navigate("/login"); 
  };

  return (
    <nav>
      <div className="logout-container">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
