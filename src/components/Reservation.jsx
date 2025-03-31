import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/reservation.css';

const Reservation = ({ cart = [], orderType = "dine-in", subtotal = 0, tax = 0, total = 0, onBack }) => {
  const navigate = useNavigate();

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [reservationId, setReservationId] = useState('');
  const timeSlots = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
    '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
  ];

  useEffect(() => {
    console.log('Running useEffect')
    if (!date) {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      setDate(formattedDate);
    }

    if (!time) {
      setTime(timeSlots[0]);
    }
  }, [date, time]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReservationId = 'RES-' + Math.floor(100000 + Math.random() * 900000);
    setReservationId(newReservationId);

    // Show confirmation
    setIsConfirmed(true);
  };

  return (
    <div className="reservation-container">
      <div className="reservation-header">
        <button className="back-button" onClick={onBack || (() => navigate('/cart'))}>
          ← Back to Cart
        </button>
        <h2 className="reservation-title">Make a Reservation</h2>
      </div>

      {!isConfirmed ? (
        <div className="reservation-content">
          <div className="reservation-form-section">
            <form onSubmit={handleSubmit} className="reservation-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your full name"
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
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="time">Time</label>
                <select
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="guests">Number of Guests</label>
                <input
                  type="number"
                  id="guests"
                  min="1"
                  max="20"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="specialRequests">Special Requests</label>
                <textarea
                  id="specialRequests"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Any special requests or dietary requirements?"
                  rows="3"
                ></textarea>
              </div>

              <button type="submit" className="reservation-button">
                Confirm Reservation
              </button>
            </form>
          </div>

          <div className="order-summary-section">
            <h3>Order Summary</h3>
            <div className="order-items">
              {cart.map((item) => (
                <div key={item.id} className="order-item">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">x {item.quantity}</span>
                  <span className="item-price">${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="reservation-confirmation">
          <div className="confirmation-icon">✓</div>
          <h3>Reservation Confirmed!</h3>
          <p>Thank you for your reservation, {name}.</p>
          <div className="confirmation-details">
            <p><strong>Reservation ID:</strong> {reservationId}</p>
            <p><strong>Date:</strong> {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Time:</strong> {time}</p>
            <p><strong>Guests:</strong> {guests}</p>
            <p><strong>Total:</strong> ${total.toFixed(2)}</p>
          </div>
          <p>We've sent a confirmation email to {email}. Please arrive 10 minutes before your reservation time.</p>
          <button onClick={() => navigate('/')} className="return-home-button">
            Return to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default Reservation;
