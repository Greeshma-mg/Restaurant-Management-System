import React, { useState, useEffect } from 'react';
import '../assets/ManageReservations.css';

const ManageReservations = () => {
  // State for reservations
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('all'); // 'all', 'today', 'upcoming', 'past'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    tableId: '',
    notes: '',
    status: 'confirmed'
  });

  useEffect(() => {

    const fetchReservations = async () => {
      try {
        setLoading(true);
        const mockReservations = [
          { id: 1, name: 'John ', email: 'john@gmail.com', phone: '9567611293', date: '2025-03-17', time: '18:00', guests: 2, tableId: 5, notes: 'Anniversary dinner', status: 'confirmed' },
          { id: 2, name: 'Sarah ', email: 'sarah@gmail.com', phone: '6235489241', date: '2025-03-17', time: '19:00', guests: 4, tableId: 8, notes: 'Birthday celebration', status: 'confirmed' },
          { id: 3, name: 'Sneha', email: 'sneha@gmail.com', phone: '7892456203', date: '2025-03-18', time: '20:00', guests: 6, tableId: 12, notes: 'Business dinner', status: 'pending' },
          { id: 4, name: 'Sayooj', email: 'sayooj@gmail.com', phone: '6542130366', date: '2025-03-19', time: '17:30', guests: 2, tableId: 3, notes: '', status: 'confirmed' },
          { id: 5, name: 'Aravind', email: 'aravind@gmail.com', phone: '9987451236', date: '2025-03-16', time: '19:30', guests: 3, tableId: 7, notes: 'Prefers window seat', status: 'completed' },
          { id: 6, name: 'Anu', email: 'anu@gmail.com', phone: '7458693625', date: '2025-03-17', time: '18:30', guests: 5, tableId: 10, notes: 'Celebrating graduation', status: 'confirmed' },
          { id: 7, name: 'Arun', email: 'arun@gmail.com', phone: '8923014596', date: '2025-03-20', time: '19:00', guests: 2, tableId: 4, notes: '', status: 'confirmed' },
          { id: 8, name: 'Jessica', email: 'jessica@gmail.com', phone: '9945632104', date: '2025-03-15', time: '20:00', guests: 4, tableId: 9, notes: 'Food allergies noted in profile', status: 'cancelled' }
        ];
        setReservations(mockReservations);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reservations:', err);
        setLoading(false);
      }
    };
    
    fetchReservations();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleBackClick = () => {
    
    window.history.back();
  };
  const getFilteredReservations = () => {
    const today = new Date().toISOString().split('T')[0];
    
    let filtered = [...reservations];
    
    if (currentView === 'today') {
      filtered = filtered.filter(res => res.date === today);
    } else if (currentView === 'upcoming') {
      filtered = filtered.filter(res => res.date > today);
    } else if (currentView === 'past') {
      filtered = filtered.filter(res => res.date < today);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(res => 
        res.name.toLowerCase().includes(term) ||
        res.email.toLowerCase().includes(term) ||
        res.phone.includes(term) ||
        res.notes.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedReservation) {
      const updatedReservations = reservations.map(res => 
        res.id === selectedReservation.id ? { ...formData, id: res.id } : res
      );
      setReservations(updatedReservations);
    } else {
      // Add new reservation
      const newReservation = {
        ...formData,
        id: reservations.length + 1
      };
      setReservations([...reservations, newReservation]);
    }
        setShowModal(false);
    setSelectedReservation(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: 2,
      tableId: '',
      notes: '',
      status: 'confirmed'
    });
  };
  const handleAddNew = () => {
    setSelectedReservation(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: 2,
      tableId: '',
      notes: '',
      status: 'confirmed'
    });
    setShowModal(true);
  };
  const handleEdit = (reservation) => {
    setSelectedReservation(reservation);
    setFormData({
      name: reservation.name,
      email: reservation.email,
      phone: reservation.phone,
      date: reservation.date,
      time: reservation.time,
      guests: reservation.guests,
      tableId: reservation.tableId,
      notes: reservation.notes,
      status: reservation.status
    });
    setShowModal(true);
  };

  // Delete reservation
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      const updatedReservations = reservations.filter(res => res.id !== id);
      setReservations(updatedReservations);
    }
  };

  // Change reservation status
  const handleStatusChange = (id, newStatus) => {
    const updatedReservations = reservations.map(res => 
      res.id === id ? { ...res, status: newStatus } : res
    );
    setReservations(updatedReservations);
  };

  if (loading) {
    return <div className="loading">Loading reservations...</div>;
  }

  return (
    <div className="manage-reservations">
      <div className="header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <h1>Manage Reservations</h1>
      </div>

      <div className="controls">
        <div className="filter-tabs">
          <button 
            className={currentView === 'all' ? 'active' : ''} 
            onClick={() => setCurrentView('all')}
          >
            All Reservations
          </button>
          <button 
            className={currentView === 'today' ? 'active' : ''} 
            onClick={() => setCurrentView('today')}
          >
            Today
          </button>
          <button 
            className={currentView === 'upcoming' ? 'active' : ''} 
            onClick={() => setCurrentView('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={currentView === 'past' ? 'active' : ''} 
            onClick={() => setCurrentView('past')}
          >
            Past
          </button>
        </div>

        <div className="search-add">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search reservations..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <button className="search-btn">Search</button>
          </div>
          <button className="add-btn" onClick={handleAddNew}>Add New Reservation</button>
        </div>
      </div>

      <div className="reservations-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date & Time</th>
              <th>Guests</th>
              <th>Table</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredReservations().map((reservation) => (
              <tr key={reservation.id} className={`status-${reservation.status}`}>
                <td>{reservation.name}</td>
                <td>
                  {formatDate(reservation.date)} at {reservation.time}
                </td>
                <td>{reservation.guests}</td>
                <td>Table {reservation.tableId}</td>
                <td>
                  <div>{reservation.phone}</div>
                  <div className="email">{reservation.email}</div>
                </td>
                <td>
                  <select 
                    value={reservation.status}
                    onChange={(e) => handleStatusChange(reservation.id, e.target.value)}
                    className={`status-select ${reservation.status}`}
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="actions">
                  <button 
                    className="edit-btn"
                    onClick={() => handleEdit(reservation)}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(reservation.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{selectedReservation ? 'Edit Reservation' : 'New Reservation'}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name:</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email:</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Phone:</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date:</label>
                  <input 
                    type="date" 
                    name="date" 
                    value={formData.date} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Time:</label>
                  <input 
                    type="time" 
                    name="time" 
                    value={formData.time} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Guests:</label>
                  <input 
                    type="number" 
                    name="guests" 
                    value={formData.guests} 
                    onChange={handleInputChange} 
                    min="1" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Table Number:</label>
                  <input 
                    type="number" 
                    name="tableId" 
                    value={formData.tableId} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Status:</label>
                <select 
                  name="status" 
                  value={formData.status} 
                  onChange={handleInputChange}
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="form-group">
                <label>Notes:</label>
                <textarea 
                  name="notes" 
                  value={formData.notes} 
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="save-btn">Save Reservation</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageReservations;