import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/orderType.css";
import deliveryImg from "/images/delivery.jpg"; 
import dineInImg from "/images/dinein.jpg"; 

const OrderType = () => {
  const navigate = useNavigate();

  return (
    <div className="order-type-container">
      <h1>How would you like to order?</h1>
      
      <div className="order-options">
        <div className="order-option" onClick={() => navigate("/menu?type=delivery")}>
          <img src={deliveryImg} alt="Delivery" />
          <h2>Delivery</h2>
          <p>Get your order delivered to your doorstep.</p>
        </div>

        <div className="order-option" onClick={() => navigate("/menu?type=dinein")}>
          <img src={dineInImg} alt="Dine In" />
          <h2>Dine-In</h2>
          <p>Enjoy your meal at our restaurant.</p>
        </div>
      </div>
    </div>
  );
};

export default OrderType;
