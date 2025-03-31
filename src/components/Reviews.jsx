import React, { useState, useEffect } from 'react';
import "../assets/reviews.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    console.log('Running useEffect')
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const mockReviews = [
          {
            id: 1,
            customerName: 'Emily T.',
            rating: 4,
            date: '2025-03-12',
            review: 'Great food and excellent service!',
            status: 'published'
          },
          {
            id: 2,
            customerName: 'Michael R.',
            rating: 2,
            date: '2025-03-10',
            review: 'Food was good but the service was slow.',
            status: 'published'
          },
          {
            id: 3,
            customerName: 'Sophia L.',
            rating: 1,
            date: '2025-03-08',
            review: 'The food was cold and the service was poor.',
            status: 'pending'
          }
        ];
        
        setReviews(mockReviews);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, []);
  const handleApprove = (id) => {
    const updatedReviews = reviews.map(review => {
      if (review.id === id) {
        return { ...review, status: 'published' };
      }
      return review;
    });
    
    setReviews(updatedReviews);
  };
  const handleDelete = (id) => {
    const updatedReviews = reviews.filter(review => review.id !== id);
    setReviews(updatedReviews);
  };
  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  return (
    <div className="reviews-container">
      <h1>Customer Reviews</h1>
      
      {reviews.length === 0 ? (
        <p>No reviews available</p>
      ) : (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <h3>{review.customerName}</h3>
                <div className="rating">{renderStars(review.rating)}</div>
                <p className="date">{review.date}</p>
              </div>
              
              <p className="review-text">{review.review}</p>
              
              <div className="review-status">
                Status: {review.status === 'published' ? 'Published' : 'Pending'}
              </div>
              
              <div className="review-actions">
                {review.status === 'pending' && (
                  <button onClick={() => handleApprove(review.id)}>
                    Approve
                  </button>
                )}
                <button onClick={() => handleDelete(review.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;