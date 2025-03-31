
import React from 'react';
import { Link } from 'react-router-dom';
import "../assets/home.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Savory Elegance</h3>
          <p>Vytila kochi<br />Pipeline road,ernklm</p>
          <p>Phone:+918569237810</p>
          <p>Email: info@Savory Elegance.com</p>
        </div>
        <div className="footer-section">
          <h3>Hours</h3>
          <p>Monday - Thursday: 11am - 10pm</p>
          <p>Friday - Saturday: 11am - 11pm</p>
          <p>Sunday: 12pm - 9pm</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/reservations">Reservations</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Connect With Us</h3>
          <div className="social-icons">
            <a href="#" className="social-icon">Facebook</a>
            <a href="#" className="social-icon">Instagram</a>
            <a href="#" className="social-icon">Twitter</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Savory Elegance. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;