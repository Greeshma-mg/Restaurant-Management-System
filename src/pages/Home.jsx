import { Link, useNavigate } from "react-router-dom";
import "../assets/home.css";
import AdminHome from "../components/AdminHome";
import Footer from "../components/Footer";

// Image Imports (Ensure they're in the correct path)
import aboutImage from "../assets/images/about.jpg";
import chefImage from "../assets/images/chef.jpg";
import chef1Image from "../assets/images/chef1.jpg";
import chef2Image from "../assets/images/chef2.jpg";
import cravingImage from "../assets/images/craving.jpg";
import pastaImage from "../assets/images/pasta.jpg";
import salmon1Image from "../assets/images/salmon1.jpg";
import dessertImage from "../assets/images/dessert.jpg";
import biriyaniImage from "../assets/images/biriyani.jpg";
import chicken1Image from "../assets/images/chicken1.jpg";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || null;

  // Navigation Functions
  function goToLogin() {
    navigate("/login");
  }

  function handleOrderTypeNavigation() {
    navigate("/order-type");
  }

  function handleReviewsNavigation(e) {
    e.preventDefault();
    
    if (!user) {
      navigate("/login");
      return;
    }
    
    if (user.role === "admin") {
      navigate("/admin/reviews");
    } else {
      navigate("/reviews-coming-soon"); // Redirect instead of an alert
    }
  }

  // Admin View
  if (user?.role === "admin") {
    return <AdminHome />;
  }

  // Customer View
  if (user) {
    return (
      <div className="home-container">
        <h1>Welcome to Savory Elegance</h1>

        {/* Hero Section */}
        <div className="image-container">
          <img src={cravingImage} alt="Restaurant Banner" className="background-image" />
          <div className="image-overlay">
            <h1>THE COMFORT YOU CRAVE</h1>
            <button onClick={handleOrderTypeNavigation} className="cta-button">ORDER NOW</button>
          </div>
        </div>

        {/* About Section */}
        <div className="about-section">
          <div className="about-content">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2010, Savory Elegance has been serving exceptional cuisine for over a decade.
                Our passion for quality ingredients and innovative recipes has made us a favorite 
                destination for food lovers across the city.
              </p>
            </div>
            <div className="about-image">
              <img src={aboutImage} alt="About Us" />
            </div>
          </div>
        </div>

        {/* Featured Dishes Section */}
        <div className="featured-section">
          <h2>Today's Specials</h2>
          <div className="featured-items">
            {[
              { name: "Signature Pasta", description: "Our house specialty", price: "$14.99", imageSrc: pastaImage },
              { name: "Grilled Salmon", description: "Fresh Atlantic salmon", price: "$18.99", imageSrc: salmon1Image },
              { name: "Chef's Dessert", description: "Surprise dessert daily", price: "$8.99", imageSrc: dessertImage },
              { name: "Chef's Biriyani", description: "Aromatic rice dish", price: "$13.99", imageSrc: biriyaniImage },
              { name: "Chicken Grill", description: "Juicy, smoky chicken", price: "$18.99", imageSrc: chicken1Image },
            ].map((item, index) => (
              <div className="featured-item" key={`dish-${index}`}>
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

        {/* Call-to-Action Buttons */}
        <div className="cta-section">
          <button onClick={handleOrderTypeNavigation} className="cta-button">Browse Menu</button>
          <button onClick={() => navigate("/reservations")} className="cta-button secondary">Make a Reservation</button>
        </div>

        {/* Chef Team Section */}
        <div className="chefs-section">
          <h2>Meet Our Culinary Team</h2>
          <div className="chefs-container">
            {[
              { name: "Chef Maria", title: "Executive Chef", bio: "15 years in fine dining", image: chefImage },
              { name: "Chef James", title: "Sous Chef", bio: "Fusion cuisine expert", image: chef1Image },
              { name: "Chef Sarah", title: "Pastry Chef", bio: "Award-winning pastry artist", image: chef2Image },
            ].map((chef, index) => (
              <div className="chef-card" key={`chef-${index}`}>
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
              <div className="review-card" key={`review-${index}`}>
                <div className="review-header">
                  <h3>{review.name}</h3>
                  <div className="rating">
                    {[...Array(review.rating)].map((_, starIndex) => (
                      <span key={`star-${starIndex}`} className="star">★</span>
                    ))}
                  </div>
                </div>
                <p className="review-comment">"{review.comment}"</p>
                <p className="review-date">{review.date}</p>
              </div>
            ))}
          </div>
          <button onClick={handleReviewsNavigation} className="view-all-button">View All Reviews</button>
        </div>

        <Footer />
      </div>
    );
  }

  // Guest View (Not Logged In)
  return (
    <div className="home-container">
      <div className="image-container">
        <img src={cravingImage} alt="Restaurant Banner" className="background-image" />
        <div className="image-overlay">
          <h1>THE COMFORT YOU CRAVE</h1>
          <button onClick={handleOrderTypeNavigation} className="cta-button">ORDER NOW</button>
        </div>
      </div>

      <div className="reviews-section">
        <h2>What Our Customers Say</h2>
        <button onClick={goToLogin} className="view-all-button">Sign In to View All Reviews</button>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
