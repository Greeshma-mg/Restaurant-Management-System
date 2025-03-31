import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cartItems }) => {
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState("");

  const handleProceed = () => {
    if (orderType === "delivery") {
      navigate("/payment"); 
    } else if (orderType === "dinein") {
      navigate("/reservation"); 
    } else {
      alert("Please select an order type (Delivery or Dine-in)");
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id}>
              <p>{item.name} - {item.price}</p>
            </div>
          ))}
          <h3>Select Order Type</h3>
          <label>
            <input 
              type="radio" 
              value="delivery" 
              checked={orderType === "delivery"} 
              onChange={() => setOrderType("delivery")} 
            />
            Delivery
          </label>
          <label>
            <input 
              type="radio" 
              value="dinein" 
              checked={orderType === "dinein"} 
              onChange={() => setOrderType("dinein")} 
            />
            Dine-in
          </label>
          <button onClick={handleProceed}>Proceed</button>
        </>
      )}
    </div>
  );
};

export default Cart;
