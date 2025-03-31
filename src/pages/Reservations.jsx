import React, { useState, useEffect } from 'react';
import '../assets/reservations.css'; 

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [newReservation, setNewReservation] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: 1,
    specialRequests: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [activeView, setActiveView] = useState('list'); 
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    
    console.log('Running useEffect')
    const mockReservations = [
      { 
        id: 1, 
        name: 'greeshma', 
        phone: '9567230140',
        email: 'gree@gmail.com',
        date: '2025-03-15', 
        time: '19:00', 
        guests: 2,
        specialRequests: 'Window seat please', 
        status: 'confirmed' 
      },
      { 
        id: 2, 
        name: 'Jane Smith',
        phone: '555-987-6543',
        email: 'jane@example.com', 
        date: '2025-03-20', 
        time: '20:30', 
        guests: 4,
        specialRequests: 'Birthday celebration', 
        status: 'pending' 
      }
    ];
    
    setReservations(mockReservations);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReservation({
      ...newReservation,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
        const reservation = {
      ...newReservation,
      id: Date.now(), 
      status: 'pending'
    };
    
    // Add to reservation list
    setReservations([...reservations, reservation]);
        setNewReservation({
      name: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      guests: 1,
      specialRequests: ''
    });
    
    setSubmitted(true);
    setShowForm(false);
        setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };
  const handleViewDetails = (reservation) => {
    setSelectedReservation(reservation);
    setActiveView('details');
  };

  const handleCancelView = (reservation) => {
    setSelectedReservation(reservation);
    setActiveView('cancel');
  };
  const handleCancelReservation = () => {
    const updatedReservations = reservations.filter(
      res => res.id !== selectedReservation.id
    );
    setReservations(updatedReservations);
    
    // Show success message
    setSubmitted(true);
    setActiveView('list');
    setSelectedReservation(null);
        setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  const handleBackToList = () => {
    setActiveView('list');
    setSelectedReservation(null);
  };
  const renderReservationDetails = () => {
    if (!selectedReservation) return null;
    
    return (
      <div className="reservation-details-view">
        <h2>Reservation Details</h2>
        <div className="details-card">
          <div className="details-header">
            <h3>{selectedReservation.name}</h3>
            <span className={`status-badge ${selectedReservation.status}`}>
              {selectedReservation.status.charAt(0).toUpperCase() + selectedReservation.status.slice(1)}
            </span>
          </div>
          
          <div className="details-body">
            <p><strong>Date:</strong> {new Date(selectedReservation.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {selectedReservation.time}</p>
            <p><strong>Number of Guests:</strong> {selectedReservation.guests}</p>
            <p><strong>Phone:</strong> {selectedReservation.phone}</p>
            <p><strong>Email:</strong> {selectedReservation.email}</p>
            
            {selectedReservation.specialRequests && (
              <div className="special-requests">
                <p><strong>Special Requests:</strong></p>
                <p>{selectedReservation.specialRequests}</p>
              </div>
            )}
          </div>
          
          <div className="details-actions">
            <button className="back-button" onClick={handleBackToList}>
              Back to Reservations
            </button>
            
            {selectedReservation.status === 'pending' && (
              <button className="cancel-button" onClick={() => handleCancelView(selectedReservation)}>
                Cancel Reservation
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };
  const renderCancelConfirmation = () => {
    if (!selectedReservation) return null;
    
    return (
      <div className="cancel-confirmation-view">
        <h2>Cancel Reservation</h2>
        <div className="cancel-card">
          <h3>Are you sure you want to cancel this reservation?</h3>
          
          <div className="reservation-summary">
            <p><strong>Name:</strong> {selectedReservation.name}</p>
            <p><strong>Date:</strong> {new Date(selectedReservation.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {selectedReservation.time}</p>
            <p><strong>Guests:</strong> {selectedReservation.guests}</p>
          </div>
          
          <div className="cancel-actions">
            <button className="confirm-cancel-button" onClick={handleCancelReservation}>
              Yes, Cancel Reservation
            </button>
            <button className="back-button" onClick={handleBackToList}>
              No, Keep Reservation
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderReservationsList = () => {
    return (
      <>
        <div className="reservations-actions">
          <button 
            className="new-reservation-button" 
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'Make New Reservation'}
          </button>
        </div>
        
        {showForm && (
          <div className="reservation-form-container">
            <h2>New Reservation</h2>
            <form className="reservation-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newReservation.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={newReservation.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newReservation.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Date:</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={newReservation.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="time">Time:</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={newReservation.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="guests">Number of Guests:</label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  min="1"
                  max="20"
                  value={newReservation.guests}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="specialRequests">Special Requests:</label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  rows="3"
                  value={newReservation.specialRequests}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="submit-button">Submit Reservation</button>
                <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}
        
        <div className="reservations-list">
          <h2>Your Reservations</h2>
          
          {reservations.length === 0 ? (
            <p className="no-reservations">You don't have any reservations yet.</p>
          ) : (
            <div className="reservation-cards">
              {reservations.map((reservation) => (
                <div key={reservation.id} className={`reservation-card ${reservation.status}`}>
                  <div className="reservation-header">
                    <h3>{reservation.name}</h3>
                    <span className={`status-badge ${reservation.status}`}>
                      {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                    </span>
                  </div>
                  <div className="reservation-details">
                    <p><strong>Date:</strong> {new Date(reservation.date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {reservation.time}</p>
                    <p><strong>Guests:</strong> {reservation.guests}</p>
                  </div>
                  <div className="reservation-actions">
                    <button 
                      className="view-details-button"
                      onClick={() => handleViewDetails(reservation)}
                    >
                      View Details
                    </button>
                    
                    {reservation.status === 'pending' && (
                      <button 
                        className="cancel-reservation-button"
                        onClick={() => handleCancelView(reservation)}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="reservations-container">
      <h1 className="page-title">Table Reservations</h1>
      
      {submitted && (
        <div className="success-message">
          <p>Your reservation has been {activeView === 'list' ? 'submitted' : 'cancelled'} successfully!</p>
        </div>
      )}
      
      {activeView === 'details' && renderReservationDetails()}
      {activeView === 'cancel' && renderCancelConfirmation()}
      {activeView === 'list' && renderReservationsList()}
    </div>
  );
};

export default Reservations;