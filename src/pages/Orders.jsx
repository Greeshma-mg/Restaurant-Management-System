import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Running useEffect - Checking User Authentication");

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      console.log("User not found, redirecting to login...");
      navigate("/login");
      return;
    }

    // Fetch orders only once
    const fetchOrders = async () => {
      try {
        const savedOrders = JSON.parse(localStorage.getItem("userOrders") || "[]");
        setOrders(savedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);  

  const handleBackToMenu = () => {
    navigate("/menu");
  };

  if (loading) {
    return <div className="loading">Loading your orders...</div>;
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <button className="back-button" onClick={handleBackToMenu}>
          ← Back to Menu
        </button>
        <h2 className="orders-title">My Orders</h2>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <p>You don't have any orders yet.</p>
          <button className="order-button" onClick={handleBackToMenu}>
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <span className="order-id">Order #{order.id}</span>
                <span className={`order-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>
              
              <div className="order-date">
                Placed on: {new Date(order.date).toLocaleString()}
              </div>
              
              <div className="order-items">
                <h4>Items:</h4>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.quantity} x {item.name} - ${item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="order-total">
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              
              {order.status === "Delivered" && (
                <button className="reorder-button">Order Again</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
