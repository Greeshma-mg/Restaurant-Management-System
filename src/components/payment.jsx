import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/payment.css";
import Footer from "../components/Footer";

const Payment = ({ cart, subtotal, tax, total }) => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [savedAddresses, setSavedAddresses] = useState([
    { id: 1, address: "121 street,chalikkavattom.vytila,kochi" },
    { id: 2, address: "456 Park Ave, kazhakkuttam,trivandrum" },
  ]);
  const [newAddressSelected, setNewAddressSelected] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardNumber, setCardNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState("");
  const [showTracking, setShowTracking] = useState(false);

  useEffect(() => {
    if (!cart || cart.length === 0) {
      const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
      if (cartData.length === 0) {
        navigate("/menu");
      }
    }
  }, [cart, navigate]);

  const handleSelectAddress = (selectedAddress) => {
    setAddress(selectedAddress);
    setNewAddressSelected(false);
  };
  const handleSelectNewAddress = () => {
    setAddress("");
    setNewAddressSelected(true);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const generateOrderId = () => {
    return "ORD-" + Math.floor(100000 + Math.random() * 900000);
  };
  const calculateEstimatedDeliveryTime = () => {
    const now = new Date();
    const deliveryTime = new Date(now.getTime() + 30 * 60000); // 30 minutes from now
    return deliveryTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  const handlePlaceOrder = () => {
    if (!address) {
      alert("Please enter a delivery address");
      return;
    }

    if (paymentMethod === "credit-card") {
      if (!cardNumber || !nameOnCard || !expiryDate || !cvv) {
        alert("Please fill in all payment details");
        return;
      }
    }
    const newOrderId = generateOrderId();
    const estimatedTime = calculateEstimatedDeliveryTime();
    
    const orderInfo = {
      id: newOrderId,
      status: "Order Received",
      address: address,
      estimatedDeliveryTime: estimatedTime,
      paymentMethod: paymentMethod,
      items: cart || JSON.parse(localStorage.getItem("cart") || "[]"),
      orderTime: new Date().toLocaleString()
    };
    
    localStorage.setItem("currentOrder", JSON.stringify(orderInfo));
    
    setOrderId(newOrderId);
    setOrderStatus("Order Received");
    setEstimatedDeliveryTime(estimatedTime);
    
    localStorage.removeItem("cart");

    // Show order confirmation
    setOrderPlaced(true);
  };

  const goToMenu = () => {
    navigate("/menu");
  };

  // Track order
  const handleTrackOrder = () => {
    setShowTracking(true);
    
    setTimeout(() => setOrderStatus("Preparing"), 5000);
    setTimeout(() => setOrderStatus("Out for Delivery"), 10000);
  };

  // View order details 
  const viewOrderDetails = () => {
    navigate(`/orders/${orderId}`);
  };

  return (
    <div className="payment-container">
      <div className="payment-header">
        <button
          onClick={goToMenu}
          className="back-button"
          style={{
            background: "none",
            border: "none",
            color: "#007bff",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ← Back to Menu
        </button>
        <h2>Payment & Delivery</h2>
      </div>

      {orderPlaced ? (
        <div className="order-confirmation">
          <div className="confirmation-message">
            <h3>Order Placed Successfully!</h3>
            <p>Your order ID: <strong>{orderId}</strong></p>
            <p>Your food is being prepared and will be delivered to:</p>
            <p className="delivery-address">{address}</p>
            <p>Estimated delivery time: <strong>{estimatedDeliveryTime}</strong></p>
            
            {!showTracking ? (
              <div className="tracking-actions">
                <button 
                  className="track-order-button" 
                  onClick={handleTrackOrder}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "16px",
                    marginRight: "10px"
                  }}
                >
                  Track Order
                </button>
                <button
                  className="return-to-menu"
                  onClick={goToMenu}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  Return to Menu
                </button>
              </div>
            ) : (
              <div className="order-tracking">
                <h4>Order Status: <span className="status-highlight">{orderStatus}</span></h4>
                <div className="progress-tracker">
                  <div className={`progress-step ${orderStatus === "Order Received" || orderStatus === "Preparing" || orderStatus === "Out for Delivery" ? "active" : ""}`}>
                    <div className="step-icon">1</div>
                    <div className="step-label">Order Received</div>
                  </div>
                  <div className="progress-line"></div>
                  <div className={`progress-step ${orderStatus === "Preparing" || orderStatus === "Out for Delivery" ? "active" : ""}`}>
                    <div className="step-icon">2</div>
                    <div className="step-label">Preparing</div>
                  </div>
                  <div className="progress-line"></div>
                  <div className={`progress-step ${orderStatus === "Out for Delivery" ? "active" : ""}`}>
                    <div className="step-icon">3</div>
                    <div className="step-label">Out for Delivery</div>
                  </div>
                  <div className="progress-line"></div>
                  <div className={`progress-step ${orderStatus === "Delivered" ? "active" : ""}`}>
                    <div className="step-icon">4</div>
                    <div className="step-label">Delivered</div>
                  </div>
                </div>
                <p>Estimated delivery by: <strong>{estimatedDeliveryTime}</strong></p>
                <button
                  className="return-to-menu"
                  onClick={goToMenu}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "16px",
                    marginTop: "20px"
                  }}
                >
                  Return to Menu
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="payment-content">
          <div className="address-section">
            <h3>Delivery Address</h3>
            {savedAddresses.length > 0 && (
              <div className="saved-addresses">
                <h4>Saved Addresses</h4>
                {savedAddresses.map((savedAddress) => (
                  <div
                    key={savedAddress.id}
                    className="saved-address-item"
                  >
                    <input
                      type="radio"
                      name="savedAddress"
                      checked={address === savedAddress.address && !newAddressSelected}
                      onChange={() => handleSelectAddress(savedAddress.address)}
                    />
                    <label>{savedAddress.address}</label>
                  </div>
                ))}
                <div className="saved-address-item">
                  <input
                    type="radio"
                    name="savedAddress"
                    checked={newAddressSelected}
                    onChange={handleSelectNewAddress}
                  />
                  <label>Use a new address</label>
                </div>
              </div>
            )}
            <textarea
              placeholder="Enter your full delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="address-input"
              rows={4}
            />
          </div>

          <div className="payment-method-section">
            <h3>Payment Method</h3>
            <div className="payment-methods">
              <div className="payment-method-item">
                <input
                  type="radio"
                  id="credit-card"
                  name="paymentMethod"
                  value="credit-card"
                  checked={paymentMethod === "credit-card"}
                  onChange={handlePaymentMethodChange}
                />
                <label htmlFor="credit-card">Credit/Debit Card</label>
              </div>
              <div className="payment-method-item">
                <input
                  type="radio"
                  id="UPI"
                  name="paymentMethod"
                  value="UPI"
                  checked={paymentMethod === "UPI"}
                  onChange={handlePaymentMethodChange}
                />
                <label htmlFor="UPI">UPI</label>
              </div>
              <div className="payment-method-item">
                <input
                  type="radio"
                  id="cash"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={handlePaymentMethodChange}
                />
                <label htmlFor="cash">Cash on Delivery</label>
              </div>
            </div>

            {paymentMethod === "credit-card" && (
              <div className="card-details">
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nameOnCard">Name on Card</label>
                  <input
                    type="text"
                    id="nameOnCard"
                    placeholder="John Doe"
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <button className="place-order-button" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Payment;