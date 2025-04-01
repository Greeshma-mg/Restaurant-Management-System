import { Link, useNavigate } from "react-router-dom";
import "../assets/home.css";
import AdminHome from "../components/AdminHome"; 
import Footer from "../components/Footer";
import aboutImage from "/images/about.jpg";
import chefImage from "/images/chef.jpg";
import chef1Image from "/images/chef1.jpg";
import chef2Image from "/images/chef2.jpg";
import cravingImage from "/images/craving.jpg"; 
import pastaImage from "/images/pasta.jpg";
import salmon1Image from "/images/salmon1.jpg";
import dessertImage from "/images/dessert.jpg";
import biriyaniImage from "/images/biriyani.jpg";
import chicken1Image from "/images/chicken1.jpg";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  function goToLogin() {
    console.log("Navigating to login page");
    navigate("/login");
  }

  function handleOrderTypeNavigation() {
    navigate("/order-type"); 
  }

  function handleReviewsNavigation(e) {
    e.preventDefault(); 
    console.log("Reviews navigation clicked");
    
    if (!user) {
      navigate("/login");
      return;
    }
    
    if (user.role === "admin") {
      navigate("/admin/reviews");
    } else {
      alert("Full reviews page coming soon! For now, you can see our featured reviews here.");
    }
  }

  // Admin View
  if (user && user.role === "admin") {
    return <AdminHome />;
  }

  // Customer View
  if (user) {
    return (
      <div className="home-container">
        <h1>Welcome to Savory Elegance</h1>
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
                destination for food enthusiasts across the city.
              </p>
            </div>
            <div className="about-image">
              <img src={aboutImage} alt="about" />
            </div>
          </div>
        </div>

        {/* Featured Section */}
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

        <div className="cta-section">
          <button onClick={handleOrderTypeNavigation} className="cta-button">Browse Menu</button>
          <button onClick={() => navigate("/reservations")} className="cta-button secondary">Make a Reservation</button>
        </div>

        {/* Chefs Section */}
        <div className="chefs-section">
          <h2>Meet Our Culinary Team</h2>
          <div className="chefs-container">
            {[
              { name: "Chef Maria", title: "Executive Chef", bio: "15 years in fine dining", image: chefImage },
              { name: "Chef James", title: "Sous Chef", bio: "Fusion cuisine expert", image: chef1Image },
              { name: "Chef Sarah", title: "Pastry Chef", bio: "Award-winning pastry artist", image: chef2Image },
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

      <div className="reviews-section" id="reviews">
        <h2>What Our Customers Say</h2>
        <button onClick={goToLogin} className="view-all-button">Sign In to View All Reviews</button>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
