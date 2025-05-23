import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/payment.css";
import Footer from "../components/Footer";

const Payment = ({ cart, subtotal, tax, total }) => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [savedAddresses, setSavedAddresses] = useState([
    { id: 1, address: "121 street, Chalikkavattom, Vytila, Kochi" },
    { id: 2, address: "456 Park Ave, Kazhakkuttam, Trivandrum" },
  ]);
  const [newAddressSelected, setNewAddressSelected] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardNumber, setCardNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (!cart || cart.length === 0) {
      const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
      if (cartData.length === 0) {
        navigate("/menu");
      }
    }
  }, [cart, navigate]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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

  const handlePlaceOrder = async () => {
    if (!address) {
      alert("Please enter a delivery address");
      return;
    }

    if (paymentMethod === "credit-card") {
      if (!cardNumber || !nameOnCard || !expiryDate || !cvv) {
        alert("Please fill in all payment details");
        return;
      }
      localStorage.removeItem("cart");
      setOrderPlaced(true);
    } else if (paymentMethod === "razorpay") {
      try {
        const response = await fetch("http://localhost:5000/api/razorpay/create-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: total }),
        });

        const orderData = await response.json();

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "RestaurantPro",
          description: "Order Payment",
          order_id: orderData.id,
          handler: function (response) {
            localStorage.removeItem("cart");
            setOrderPlaced(true);
          },
          prefill: {
            name: nameOnCard || "Customer",
            email: "customer@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#F37254",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Razorpay Error:", error);
        alert("Payment failed, please try again.");
      }
    } else {
      localStorage.removeItem("cart");
      setOrderPlaced(true);
    }
  };

  const goToMenu = () => {
    navigate("/menu");
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
            <p>Your food is being prepared and will be delivered to:</p>
            <p className="delivery-address">{address}</p>
            <p>Thank you for your order!</p>
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
        </div>
      ) : (
        <div className="payment-content">
          <div className="address-section">
            <h3>Delivery Address</h3>
            {savedAddresses.length > 0 && (
              <div className="saved-addresses">
                <h4>Saved Addresses</h4>
                {savedAddresses.map((savedAddress) => (
                  <div key={savedAddress.id} className="saved-address-item">
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
              <div className="payment-method-item">
                <input
                  type="radio"
                  id="razorpay"
                  name="paymentMethod"
                  value="razorpay"
                  checked={paymentMethod === "razorpay"}
                  onChange={handlePaymentMethodChange}
                />
                <label htmlFor="razorpay">Pay with Razorpay</label>
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
