import React, { useState, useEffect } from 'react';
import '../assets/Analytics.css';

const Analytics = () => {
  const [salesData, setSalesData] = useState([]);
  const [popularItems, setPopularItems] = useState([]);
  const [revenueStats, setRevenueStats] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');

  const fetchDataForTimeRange = (range) => {
    setIsLoading(true);
    
    let newSalesData = [];
    let newPopularItems = [];
    let newRevenueStats = {};
    
    switch(range) {
      case 'day':
        newSalesData = [
          { date: '2025-03-17', total: 1325.90 }
        ];
        newPopularItems = [
          { name: 'Chili Garlic Noodles', count: 145, revenue: 1884.55 },
          { name: 'Butter Chicken', count: 98, revenue: 881.02 },
          { name: 'Chicken Biryani', count: 87, revenue: 695.13 },
          { name: 'Masala Chai', count: 76, revenue: 912.24 },
          { name: 'Capuccino', count: 112, revenue: 336.00 }
        ];
        newRevenueStats = {
          daily: 1325.90,
          weekly: 11084.05,
          monthly: 42500.75
        };
        break;
      
      case 'week':
        newSalesData = [
          { date: '2025-03-11', total: 1250.85 },
          { date: '2025-03-12', total: 1456.20 },
          { date: '2025-03-13', total: 1120.75 },
          { date: '2025-03-14', total: 1875.30 },
          { date: '2025-03-15', total: 2150.45 },
          { date: '2025-03-16', total: 1905.60 },
          { date: '2025-03-17', total: 1325.90 }
        ];
        newPopularItems = [
          { name: 'Chili Garlic Noodles', count: 115, revenue: 1124.55 },
          { name: 'Butter Chicken', count: 58, revenue: 87.02 },
          { name: 'Chicken Biryani', count: 87, revenue: 595.13 },
          { name: 'Masala Chai', count: 86, revenue: 992.24 },
          { name: 'Capuccino', count: 122, revenue: 386.00 }
        ];
        newRevenueStats = {
          daily: 1325.90,
          weekly: 11084.05,
          monthly: 42500.75
        };
        break;
      
      case 'month':
        newSalesData = [
          { date: '2025-02-17', total: 1050.40 },
          { date: '2025-02-24', total: 1240.65 },
          { date: '2025-03-03', total: 1435.20 },
          { date: '2025-03-10', total: 1685.90 },
          { date: '2025-03-17', total: 1825.75 }
        ];
        newPopularItems = [
          { name: 'Chili Garlic Noodles', count: 115, revenue: 1224.55 },
          { name: 'Butter Chicken', count: 68, revenue: 97.02 },
          { name: 'Chicken Biryani', count: 77, revenue: 695.13 },
          { name: 'Masala Chai', count: 76, revenue: 892.24 },
          { name: 'Capuccino', count: 112, revenue: 356.00 }
        ];
        
        newRevenueStats = {
          daily: 1825.75,
          weekly: 15750.30,
          monthly: 42500.75
        };
        break;
      
      case 'quarter':
        newSalesData = [
          { date: '2025-01-01', total: 32560.75 },
          { date: '2025-02-01', total: 38765.90 },
          { date: '2025-03-01', total: 42500.75 }
        ];
        newPopularItems = [
          { name: 'Chili Garlic Noodles', count: 135, revenue: 1324.55 },
          { name: 'Butter Chicken', count: 68, revenue: 83.02 },
          { name: 'Chicken Biryani', count: 87, revenue: 595.13 },
          { name: 'Masala Chai', count: 56, revenue: 892.24 },
          { name: 'Capuccino', count: 132, revenue: 396.00 }
        
        ];
        newRevenueStats = {
          daily: 1825.75,
          weekly: 15750.30,
          monthly: 42500.75
        };
        break;
      
      default:
        newSalesData = [
          { date: '2025-03-11', total: 1250.85 },
          { date: '2025-03-12', total: 1456.20 },
          { date: '2025-03-13', total: 1120.75 },
          { date: '2025-03-14', total: 1875.30 },
          { date: '2025-03-15', total: 2150.45 },
          { date: '2025-03-16', total: 1905.60 },
          { date: '2025-03-17', total: 1325.90 }
        ];
        newPopularItems = [
          { name: 'Chili Garlic Noodles', count: 117, revenue: 1024.55 },
          { name: 'Butter Chicken', count: 68, revenue: 97.02 },
          { name: 'Chicken Biryani', count: 67, revenue: 593.13 },
          { name: 'Masala Chai', count: 76, revenue: 982.24 },
          { name: 'Capuccino', count: 102, revenue: 376.00 }
        
        ];
        newRevenueStats = {
          daily: 1325.90,
          weekly: 11084.05,
          monthly: 42500.75
        };
    }
    
    setTimeout(() => {
      setSalesData(newSalesData);
      setPopularItems(newPopularItems);
      setRevenueStats(newRevenueStats);
      setIsLoading(false);
    }, 800); 
  };

  useEffect(() => {
    fetchDataForTimeRange(timeRange);
  }, [timeRange]);

  const handleTimeRangeChange = (e) => {
    const newTimeRange = e.target.value;
    setTimeRange(newTimeRange);
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
        <h1>Restaurant Analytics Dashboard</h1>
      </div>

      <div className="time-filter">
        <label htmlFor="timeRange">Time Range:</label>
        <select 
          id="timeRange" 
          value={timeRange} 
          onChange={handleTimeRangeChange}
        >
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
        </select>
      </div>

      {isLoading ? (
        <div className="loading">Loading analytics data...</div>
      ) : (
        <>
          <div className="stats-cards">
            <div className="stat-card">
              <h3>Today's Revenue</h3>
              <p className="stat-value">${revenueStats.daily.toFixed(2)}</p>
            </div>
            <div className="stat-card">
              <h3>Weekly Revenue</h3>
              <p className="stat-value">${revenueStats.weekly.toFixed(2)}</p>
            </div>
            <div className="stat-card">
              <h3>Monthly Revenue</h3>
              <p className="stat-value">${revenueStats.monthly.toFixed(2)}</p>
            </div>
          </div>

          <div className="analytics-grid">
            <div className="chart-container">
              <h2>Sales Trend</h2>
              <div className="chart">
                <div className="sales-chart-placeholder">
                  {salesData.map((day, index) => {
                    const maxValue = Math.max(...salesData.map(d => d.total));
                    return (
                      <div 
                        key={index} 
                        className="chart-bar" 
                        style={{ 
                          height: `${(day.total / maxValue) * 100}%`,
                          backgroundColor: `hsl(${120 + index * 10}, 70%, 50%)` 
                        }}
                        title={`${day.date}: $${day.total.toFixed(2)}`}
                      ></div>
                    );
                  })}
                </div>
                <div className="chart-x-axis">
                  {salesData.map((day, index) => (
                    <div key={index} className="x-label">
                      {timeRange === 'quarter' 
                        ? new Date(day.date).toLocaleDateString('en-US', { month: 'short' })
                        : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="popular-items">
              <h2>Top Selling Items</h2>
              <table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity Sold</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {popularItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.count}</td>
                      <td>${item.revenue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="analytics-summary">
            <h2>Summary</h2>
            <div className="summary-content">
              <p>Based on the current data, <strong>{popularItems[0]?.name}</strong> is your best-selling item, generating ${popularItems[0]?.revenue.toFixed(2)} in revenue.</p>
              
              {timeRange !== 'day' && salesData.length > 1 && (
                <p>
                  Your busiest {timeRange === 'quarter' ? 'month' : 'day'} this {timeRange} was <strong>
                  {timeRange === 'quarter' 
                    ? new Date(salesData[salesData.findIndex(d => d.total === Math.max(...salesData.map(d => d.total)))].date).toLocaleDateString('en-US', { month: 'long' })
                    : new Date(salesData[salesData.findIndex(d => d.total === Math.max(...salesData.map(d => d.total)))].date).toLocaleDateString('en-US', { weekday: 'long' })}
                  </strong> with ${Math.max(...salesData.map(d => d.total)).toFixed(2)} in sales.
                </p>
              )}
              
              <p>{timeRange === 'day' ? 'Today\'s' : timeRange === 'week' ? 'Weekly' : timeRange === 'month' ? 'Monthly' : 'Quarterly'} revenue is <strong>${timeRange === 'day' ? revenueStats.daily : timeRange === 'week' ? revenueStats.weekly : revenueStats.monthly.toFixed(2)}</strong>, which is {timeRange === 'day' ? (revenueStats.daily > 1200 ? 'above' : 'below') : timeRange === 'week' ? (revenueStats.weekly > 10000 ? 'above' : 'below') : (revenueStats.monthly > 40000 ? 'above' : 'below')} the target.</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;