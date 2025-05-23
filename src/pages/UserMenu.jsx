import React, { useState, useEffect } from 'react';
import '../assets/UserMenu.css';
import API from '../api';
const backendURL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const UserMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [error, setError] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(null);

  const fetchMenuItems = async () => {
    setIsLoading(true);
    const timestamp = Date.now();
    
    try {
      console.log(`Fetching menu items at ${new Date().toLocaleTimeString()}...`);
      const response = await API.get(`/menu?t=${timestamp}`);
      
      const data = response.data;
      console.log("Fetched data from API:", data);
  
      let items = [];
      if (Array.isArray(data)) {
        items = data;
      } else if (data?.data && Array.isArray(data.data)) {
        items = data.data;
      } else {
        throw new Error("API returned unexpected data structure");
      }
  
      items = items.filter(item => item && item.name && item.price);
  
      setMenuItems(items);
      setLastFetchTime(new Date().toLocaleTimeString());
      localStorage.setItem('menuItems', JSON.stringify(items));
      setError(null);
  
    } catch (error) {
      console.error("❌ Error fetching menu:", error);
      setError(error.response?.data?.message || error.message);
  
      const cachedItems = localStorage.getItem('menuItems');
      if (cachedItems) {
        const parsedItems = JSON.parse(cachedItems);
        setMenuItems(parsedItems);
        setError(`Failed to fetch fresh data. Using cached data: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    fetchMenuItems();
    
    const intervalId = setInterval(fetchMenuItems, 30000); 
    
    return () => clearInterval(intervalId);
  }, []);

  const categories = ['All', ...new Set(
    menuItems
      .filter(item => item && item.category)
      .map(item => item.category)
  )];

  const filteredItems = menuItems.filter(item => {
    if (!item) return false;
    
    const isItemAvailable = (
      (item.isAvailable === true || item.availability === true) ||
      (item.isAvailable === undefined && item.availability === undefined)
    );
    
    if (selectedCategory === 'All') {
      return isItemAvailable;
    } else {
      return item.category === selectedCategory && isItemAvailable;
    }
  });

  console.log(`Filtered items for ${selectedCategory}:`, filteredItems.length);

  if (isLoading && menuItems.length === 0) {
    return (
      <div className="loading">
        <p>Loading menu items...</p>
      </div>
    );
  }

  return (
    <div className="user-menu-container">
      <h1>Our Menu</h1>
      
      {error && (
        <div className="error-banner" style={{
          background: '#ffecec', 
          color: '#f44336', 
          padding: '10px', 
          margin: '10px 0', 
          borderRadius: '4px',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>{error}</span>
          <button 
            onClick={fetchMenuItems}
            style={{background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
          >
            Try Again
          </button>
        </div>
      )}
      
      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="menu-items-grid">
        {filteredItems.length === 0 ? (
          <div className="no-items-message">
            <p>No menu items available in this category.</p>
          </div>
        ) : (
          filteredItems.map((item, index) => (
            <div key={item._id || item.id || `menu-item-${index}`} className="menu-item-card">
              {item.image && (
                <div className="menu-item-image">
                  <img 
                    src={item.image.startsWith('http') 
                      ? item.image 
                      : `${backendURL}/uploads/${item.image}`
                    } 
                    alt={item.name} 
                    onError={(e) => {
                      console.error(`Image failed to load: ${item.image}`);
                      e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                    }}
                  />
                </div>
              )}
              <div className="menu-item-content">
                <h3>{item.name}</h3>
                <p className="menu-item-description">{item.description || 'No description available'}</p>
                <p className="menu-item-price">${parseFloat(item.price).toFixed(2)}</p>
                <button className="add-to-cart-btn">Add to Cart</button>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div style={{display: 'flex', justifyContent: 'space-between', margin: '20px 0'}}>
        <button 
          className="refresh-button" 
          onClick={fetchMenuItems}
          style={{padding: '10px 20px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
        >
          Refresh Menu
        </button>
        
        <div style={{fontSize: '0.8rem', color: '#666'}}>
          Last updated: {lastFetchTime || 'Never'}
        </div>
      </div>
      
      <details style={{margin: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px'}}>
        <summary>Debug Information</summary>
        <div style={{fontSize: '0.8rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap'}}>
          <p>Total items in state: {menuItems.length}</p>
          <p>Filtered items for "{selectedCategory}": {filteredItems.length}</p>
          <p>Available categories: {categories.join(', ')}</p>
          <p>API Endpoint: <code>{backendURL}/api/menu?t={Date.now()}</code></p>
          
          <h4>All Items:</h4>
          <table style={{borderCollapse: 'collapse', width: '100%'}}>
            <thead>
              <tr>
                <th style={{border: '1px solid #ddd', padding: '8px', textAlign: 'left'}}>Name</th>
                <th style={{border: '1px solid #ddd', padding: '8px', textAlign: 'left'}}>Category</th>
                <th style={{border: '1px solid #ddd', padding: '8px', textAlign: 'left'}}>Price</th>
                <th style={{border: '1px solid #ddd', padding: '8px', textAlign: 'left'}}>Available</th>
                <th style={{border: '1px solid #ddd', padding: '8px', textAlign: 'left'}}>ID</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item, index) => (
                <tr key={index} style={{
                  background: filteredItems.includes(item) ? '#e8f5e9' : 'transparent'
                }}>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>{item.name}</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>{item.category}</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>${parseFloat(item.price).toFixed(2)}</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>
                    {(item.isAvailable !== false && item.availability !== false) ? '✓' : '✗'}
                  </td>
                  <td style={{border: '1px solid #ddd', padding: '8px', fontSize: '0.7rem'}}>{item._id || item.id || 'none'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <h4>Raw State Data:</h4>
          <pre style={{maxHeight: '200px', overflow: 'auto', background: '#f5f5f5', padding: '10px'}}>
            {JSON.stringify(menuItems, null, 2)}
          </pre>
        </div>
      </details>
    </div>
  );
};

export default UserMenu;