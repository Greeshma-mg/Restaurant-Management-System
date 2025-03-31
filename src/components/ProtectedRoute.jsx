import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []); 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    console.warn("🚨 No user found. Redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  if (!user.role) {
    console.warn("🚨 User role missing! Redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  // ✅ Fixed Role Checking
  if (!allowedRoles.map(role => role.trim().toLowerCase()).includes(user.role.toLowerCase())) {
    console.warn(`🚨 Access denied for role: ${user.role}. Redirecting...`);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
