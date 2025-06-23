import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "../assets/login.css";
import googleLogo from "/images/google.png"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (storedUser && token) {
      const redirectPath = storedUser.role === "admin" ? "/admin/dashboard" : "/dashboard";
      navigate(redirectPath);
    }
  }, []);

  const handleEmailPasswordSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const backendURL = import.meta.env.VITE_API_URL;
      const res = await axios.post(
        `${backendURL}/users/login`,
        { email, password },
        { withCredentials: true }
      );

      const { token, ...userData } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      const redirectPath = userData.role === "admin" ? "/admin/dashboard" : "/dashboard";
      navigate(redirectPath);
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const credential = credentialResponse.credential;
const decoded = jwtDecode(credential);

      
      const backendURL = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${backendURL}/users/google-login`, { id_token: credential }, { withCredentials: true });

      const { token, ...userData } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      const redirectPath = userData.role === "admin" ? "/admin/dashboard" : "/dashboard";
      navigate(redirectPath);
    } catch (error) {
      setError(error.response?.data?.message || "Google sign-in failed");
    }
  };

  const handleGoogleError = () => {
    setError("Google sign-in failed. Please try again.");
  };

  return (
    <div className="login-container">
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

            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              size="large"
              text="continue_with"
              shape="pill"
            />

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
