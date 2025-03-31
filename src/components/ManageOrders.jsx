import React, { useState, useEffect } from 'react';
import '../assets/ManageOrder.css';

const ManageOrder = () => {
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
 
  useEffect(() => {

   
    const fetchOrders = async () => {
      try {
        setLoading(true);
       
        const mockOrders = [
          {
            id: "ORD-2025-001",
            customer: "John ",
            table: "Table 5",
            time: "2025-03-16T12:30:00",
            status: "pending",
            total: 48.75,
            items: [
              { name: "Soups", quantity: 1, price: 18.95 },
              { name: "Grilled Meat", quantity: 1, price: 8.50 },
              { name: "Garlic Bread", quantity: 1, price: 5.95 },
              { name: "Porotta", quantity: 1, price: 7.95 },
              { name: "drinking Water", quantity: 2, price: 3.75 }
            ]
          },
          {
            id: "ORD-2025-002",
            customer: "Sneha",
            table: "Table 12",
            time: "2025-03-16T12:45:00",
            status: "preparing",
            total: 52.40,
            items: [
              { name: "Grilled Salmon", quantity: 1, price: 22.95 },
              { name: "Biriyani", quantity: 1, price: 16.50 },
              { name: "Tomato Rice", quantity: 1, price: 7.95 },
              { name: "Cappuccino", quantity: 2, price: 2.50 }
            ]
          },
          {
            id: "ORD-2025-003",
            customer: "Riya",
            table: "Table 8",
            time: "2025-03-16T13:00:00",
            status: "ready",
            total: 63.85,
            items: [
              { name: "Filet Mignon", quantity: 1, price: 32.95 },
              { name: "Butter Chicken", quantity: 1, price: 12.50 },
              { name: "Ice Cream", quantity: 1, price: 8.95 },
              { name: "Chocolate Lava Cake", quantity: 1, price: 9.45 }
            ]
          },
          {
            id: "ORD-2025-004",
            customer: "Scotwin",
            table: "Table 3",
            time: "2025-03-16T11:30:00",
            status: "delivered",
            total: 42.80,
            items: [
              { name: "Vegetable Stir Fry", quantity: 1, price: 14.95 },
              { name: "Spring Rolls", quantity: 2, price: 6.75 },
              { name: "Miso Soup", quantity: 2, price: 4.50 },
              { name: "Green Tea", quantity: 2, price: 2.75 }
            ]
          },
          {
            id: "ORD-2025-005",
            customer: "Michael Williams",
            table: "Table 7",
            time: "2025-03-16T13:15:00",
            status: "completed",
            total: 78.25,
            items: [
              { name: "Butter Naan", quantity: 1, price: 28.95 },
              { name: "Seafood Pasta", quantity: 1, price: 26.50 },
              { name: "Grilled Peri-Peri Chicken", quantity: 1, price: 9.95 },
              { name: "Mango Mastani", quantity: 1, price: 8.95 },
              { name: "Chili Garlic Noodles", quantity: 1, price: 12.95 }
            ]
          }
        ];
        
        setOrders(mockOrders);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      day: 'numeric'
    });
  };

  const toggleOrderExpansion = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      'pending': 'preparing',
      'preparing': 'ready',
      'ready': 'delivered',
      'delivered': 'completed',
      'completed': 'completed'
    };
    return statusFlow[currentStatus] || currentStatus;
  };

  const handleBack = () => {
    window.history.back();
  };
  const backButtonStyle = {
    position: 'absolute',
    top: '20px',
    left: '20px',
    padding: '10px 20px',
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    zIndex: 1000
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="manage-orders" style={{ position: 'relative', paddingTop: '60px' }}>
      <button 
        onClick={handleBack}
        style={backButtonStyle}
      >
        <span style={{ marginRight: '8px' }}>←</span> Back
      </button>
      
      <h1>Manage Orders</h1>
      
      <div className="orders-filter">
        <button 
          className={filterStatus === 'all' ? 'active' : ''} 
          onClick={() => setFilterStatus('all')}
        >
          All Orders
        </button>
        <button 
          className={filterStatus === 'pending' ? 'active' : ''} 
          onClick={() => setFilterStatus('pending')}
        >
          Pending
        </button>
        <button 
          className={filterStatus === 'preparing' ? 'active' : ''} 
          onClick={() => setFilterStatus('preparing')}
        >
          Preparing
        </button>
        <button 
          className={filterStatus === 'ready' ? 'active' : ''} 
          onClick={() => setFilterStatus('ready')}
        >
          Ready
        </button>
        <button 
          className={filterStatus === 'delivered' ? 'active' : ''} 
          onClick={() => setFilterStatus('delivered')}
        >
          Delivered
        </button>
        <button 
          className={filterStatus === 'completed' ? 'active' : ''} 
          onClick={() => setFilterStatus('completed')}
        >
          Completed
        </button>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="no-orders">No orders matching the selected filter</div>
      ) : (
        <div className="orders-list">
          {filteredOrders.map(order => (
            <div key={order.id} className={`order-card ${order.status}`}>
              <div className="order-header" onClick={() => toggleOrderExpansion(order.id)}>
                <div className="order-basic-info">
                  <h3>{order.id}</h3>
                  <p>{order.customer} - {order.table}</p>
                  <p className="order-time">{formatDateTime(order.time)}</p>
                </div>
                <div className="order-status-info">
                  <span className={`status-badge ${order.status}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <p className="order-total">${order.total.toFixed(2)}</p>
                  <span className="expand-icon">{expandedOrderId === order.id ? '▼' : '▶'}</span>
                </div>
              </div>
              
              {expandedOrderId === order.id && (
                <div className="order-details">
                  <h4>Order Items</h4>
                  <table className="items-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>${(item.quantity * item.price).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="3">Total</td>
                        <td>${order.total.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                  
                  <div className="order-actions">
                    {order.status !== 'completed' && (
                      <button 
                        className="update-status-btn"
                        onClick={() => updateOrderStatus(order.id, getNextStatus(order.status))}
                      >
                        Mark as {getNextStatus(order.status).charAt(0).toUpperCase() + getNextStatus(order.status).slice(1)}
                      </button>
                    )}
                    <button className="print-order-btn">Print Order</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOrder;