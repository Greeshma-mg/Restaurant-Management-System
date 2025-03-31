// src/components/ForgotPassword.jsx (or wherever your components are located)
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
   
    setMessage("If an account exists with this email, a password reset link has been sent.");
    
  };

  return (
    <div className="login-container">
      <h1 className="brand">RestaurantPro</h1>
      
      <h2>Reset Your Password</h2>
      {message && <div className="message">{message}</div>}
      
      <form className="login-form" onSubmit={handleSubmit}>
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
        <button type="submit" className="login-btn">Send Reset Link</button>
      </form>
      
      <div className="create-account">
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;