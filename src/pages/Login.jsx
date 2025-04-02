import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Navigate, Link } from "react-router-dom";
import "../assets/login.css";
import googleLogo from "/images/google.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Read user from localStorage safely
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    console.log("Stored User in Login Page:", storedUser);
  }, [storedUser]);

  if (storedUser) {
    return storedUser.role === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/dashboard" />;
  }

  const handleGoogleSignIn = async () => {
    try {
      console.log("Attempting Google Sign-In...");

      const userData = {
        id: "google123",
        name: "Google User",
        email: "google@example.com",
        role: "customer",
      };

      localStorage.setItem("user", JSON.stringify(userData));
      console.log("User stored after Google Sign-In:", localStorage.getItem("user"));
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign-in failed:", error);
      setError("Google sign-in failed");
    }
  };

  const handleEmailPasswordSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const backendURL = import.meta.env.VITE_BACKEND_URL;
      const res = await axios.post(`${backendURL}/users/login`, { email, password });

      console.log("API Response:", res.data); // Debugging

      const { token, ...userData } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      console.log("User stored after login:", localStorage.getItem("user"));

      const redirectPath = userData.role === "admin" ? "/admin/dashboard" : "/dashboard";
      navigate(redirectPath);
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="login-container">
      {/* Background Image */}
      <div className="background-image" style={{ backgroundImage: "url('/images/login.jpg')" }}>
        <div className="overlay">
          <div className="login-box">
            <h1 className="brand">Savory Elegance</h1>

            {error && <div className="error-message">{error}</div>}

            <form className="login-form" onSubmit={handleEmailPasswordSignIn}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                <div className="forgot-password">
                  <Link to="/forgot-password">Forgot password?</Link>
                </div>
              </div>

              <button type="submit" className="login-btn">Log In</button>
            </form>

            <div className="create-account">
              New user? <Link to="/register">Create Account</Link>
            </div>

            <div className="divider">OR</div>

            <button type="button" className="google-btn" onClick={handleGoogleSignIn}>
              <img src={googleLogo} alt="Google Logo" className="google-logo" />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
