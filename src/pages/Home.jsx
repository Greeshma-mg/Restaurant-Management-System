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

      {/* Featured Dishes */}
      <div className="featured-section">
        <h2>Today's Specials</h2>
        <div className="featured-items">
          {[
            { name: "Signature Pasta", price: "$14.99", image: images.pasta },
            { name: "Grilled Salmon", price: "$18.99", image: images.salmon },
            { name: "Chef's Dessert", price: "$8.99", image: images.dessert },
            { name: "Biriyani", price: "$13.99", image: images.biriyani },
            { name: "Chicken Grill", price: "$18.99", image: images.chicken },
          ].map((item, index) => (
            <div key={index} className="featured-item">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <span className="price">{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2>What Our Customers Say</h2>
        <button onClick={(e) => handleReviewsNavigation(e)} className="view-all-button">
          {user ? "View All Reviews" : "Sign In to View Reviews"}
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
