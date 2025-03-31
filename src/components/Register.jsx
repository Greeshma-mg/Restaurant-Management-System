import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      
      const newUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        password, 
        role: "customer"
      };

      localStorage.setItem("user", JSON.stringify(newUser));
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <h1 className="brand">RestaurantPro</h1>
      <h2>Create an Account</h2>
      
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>
        <button type="submit" className="login-btn">Create Account</button>
      </form>
      
      <div className="create-account">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};

export default Register;
