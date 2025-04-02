import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/home.css";
import AdminHome from "../components/AdminHome";
import Footer from "../components/Footer";

// Image Paths (For Public Folder)
const images = {
  about: "/images/about.jpg",
  chef: "/images/chef.jpg",
  chef1: "/images/chef1.jpg",
  chef2: "/images/chef2.jpg",
  craving: "/images/craving.jpg",
  pasta: "/images/pasta.jpg",
  salmon: "/images/salmon1.jpg",
  dessert: "/images/dessert.jpg",
  biriyani: "/images/biriyani.jpg",
  chicken: "/images/chicken1.jpg",
};

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      setUser(storedUser);
      console.log("Home Page Loaded - User:", storedUser);
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      setUser(null);
    }
  }, []);

  const goToLogin = () => navigate("/login");
  const handleOrderTypeNavigation = () => navigate("/order-type");

  const handleReviewsNavigation = (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    navigate(user.role === "admin" ? "/admin/reviews" : "/reviews-coming-soon");
  };

  if (user?.role === "admin") return <AdminHome />;

  return (
    <div className="home-container">
      <h1>Welcome to Savory Elegance</h1>

      {/* Hero Section */}
      <div className="image-container">
        <img src={images.craving} alt="Restaurant Banner" className="background-image" />
        <div className="image-overlay">
          <h1>THE COMFORT YOU CRAVE</h1>
          <button onClick={handleOrderTypeNavigation} className="cta-button">ORDER NOW</button>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section">
        <h2>Our Story</h2>
        <p>
          Founded in 2010, Savory Elegance has been serving exceptional cuisine for over a decade.
          Our passion for quality ingredients and innovative recipes has made us a favorite 
          destination for food lovers across the city.
        </p>
        <img src={images.about} alt="About Us" />
      </div>

      {/* Featured Section */}
      <div className="featured-section">
        <h2>Today's Specials</h2>
        <div className="featured-items">
          {[
            { name: "Signature Pasta", description: "Our house specialty", price: "$14.99", imageSrc: images.pasta },
            { name: "Grilled Salmon", description: "Fresh Atlantic salmon", price: "$18.99", imageSrc: images.salmon },
            { name: "Chef's Dessert", description: "Surprise dessert daily", price: "$8.99", imageSrc: images.dessert },
            { name: "Chef's Biriyani", description: "Aromatic rice dish", price: "$13.99", imageSrc: images.biriyani },
            { name: "Chicken Grill", description: "Juicy, smoky chicken", price: "$18.99", imageSrc: images.chicken },
          ].map((item, index) => (
            <div className="featured-item" key={index}>
              <div className="item-image">
                <img src={item.imageSrc} alt={item.name} />
              </div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span className="price">{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="cta-section">
        <button onClick={handleOrderTypeNavigation} className="cta-button">Browse Menu</button>
        <button onClick={() => navigate("/reservations")} className="cta-button secondary">Make a Reservation</button>
      </div>

      {/* Chefs Section */}
      <div className="chefs-section">
        <h2>Meet Our Culinary Team</h2>
        <div className="chefs-container">
          {[
            { name: "Chef Maria", title: "Executive Chef", bio: "15 years in fine dining", image: images.chef },
            { name: "Chef James", title: "Sous Chef", bio: "Fusion cuisine expert", image: images.chef1 },
            { name: "Chef Sarah", title: "Pastry Chef", bio: "Award-winning pastry artist", image: images.chef2 },
          ].map((chef, index) => (
            <div className="chef-card" key={index}>
              <div className="chef-image">
                <img src={chef.image} alt={chef.name} />
              </div>
              <h3>{chef.name}</h3>
              <h4>{chef.title}</h4>
              <p>{chef.bio}</p>
            </div>
          ))}
        </div>
      </div>

    {/* Reviews Section */}
    <div className="reviews-section" id="reviews">
        <h2>What Our Customers Say</h2>
        <div className="reviews-container">
          {[
            { name: "Emily T.", rating: 5, comment: "Best dining experience!", date: "Feb 15, 2025" },
            { name: "Michael R.", rating: 4, comment: "Great service & atmosphere.", date: "Jan 28, 2025" },
            { name: "Sophia L.", rating: 5, comment: "Perfect from appetizers to dessert!", date: "Mar 5, 2025" },
          ].map((review, index) => (
            <div className="review-card" key={index}>
              <div className="review-header">
                <h3>{review.name}</h3>
                <div className="rating">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                </div>
              </div>
              <p className="review-comment">"{review.comment}"</p>
              <p className="review-date">{review.date}</p>
            </div>
          ))}
        </div>
        <button onClick={handleReviewsPopup} className="view-all-button">View All Reviews</button>
      </div>

      {/* Popup Modal */}
      {showReviewsPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Reviews Update</h2>
            <p>Reviews will be updated soon. Stay tuned!</p>
            <button onClick={() => setShowReviewsPopup(false)} className="close-popup">Close</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
