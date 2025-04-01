import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Reservation from "../components/Reservation";
import Payment from "../components/payment";
import Footer from "../components/Footer";
import "../assets/menu.css";
import { MenuService, OrderService } from "../utils/api";

const defaultImages = {
  "starters": "/images/starters.jpg",
  "rice-breads": "/images/breads.jpg",
  "desserts": "/images/desserts.jpg",
  "beverages": "/images/beverages.jpg",
  "main-course": "/images/meals.jpg",
  "combo-meals": "/images/combo.jpg",
};

const generalFallbackImage = "/images/default.jpg";
const getImageUrl = (imagePath, category) => {
  // If no image path is provided, use the default for the category
  if (!imagePath) {
    return defaultImages[category] || generalFallbackImage;
  }

  // Handle relative paths that might be missing the leading slash
  if (!imagePath.startsWith('http') && !imagePath.startsWith('/')) {
    return `/images/${imagePath}`;
  }

  return imagePath;
};

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [orderType, setOrderType] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showReservation, setShowReservation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryItems, setCategoryItems] = useState([]);

  const navigate = useNavigate();
  const { category } = useParams();

  const allItems = [
    // Starters
    { id: 101, name: "Soups", category: "starters", price: "$12", description: "Warm, flavorful broths with vegetables, meat, or noodles.", image: "soups.jpg" },
    { id: 102, name: "Salad", category: "starters", price: "$10", description: "Fresh, crunchy mix of vegetables, fruits, or proteins.", image: "salad.jpg" },
    { id: 103, name: "Chicken Wings", category: "starters", price: "$14", description: "Spicy chicken wings with our special sauce", image: "chicken-wings.jpg" },
    { id: 104, name: "Grilled Meat", category: "starters", price: "$14", description: "Juicy, marinated meat grilled to perfection.", image: "grilled-meat.jpg" },
    { id: 105, name: "Momos", category: "starters", price: "$14", description: "Steamed or fried dumplings filled with chicken or meat.", image: "momos.jpg" },

    // Rice & Breads
    { id: 201, name: "Butter Naan", category: "rice-breads", price: "$4", description: "Soft bread baked in tandoor with butter", image: "naan.jpg" },
    { id: 202, name: "Jeera Rice", category: "rice-breads", price: "$8", description: "Basmati rice cooked with cumin seeds", image: "jeera-rice.jpg" },
    { id: 203, name: "Porotta", category: "rice-breads", price: "$5", description: "Soft, flaky, and layered flatbread made from maida.", image: "porotta.jpg" },
    { id: 204, name: "Chicken Biryani", category: "rice-breads", price: "$5", description: "Aromatic basmati rice layered with spiced chicken.", image: "biryani.jpg" },
    { id: 205, name: "Tomato Rice", category: "rice-breads", price: "$5", description: "Spiced rice cooked with tangy tomatoes.", image: "tomato-rice.jpg" },

    // Desserts
    { id: 301, name: "Gulab Jamun", category: "desserts", price: "$8", description: "Sweet milk dumplings soaked in sugar syrup", image: "gulab.jpg" },
    { id: 302, name: "Chocolate Brownie", category: "desserts", price: "$10", description: "Warm chocolate brownie with vanilla ice cream", image: "brownie.jpg" },
    { id: 303, name: "Rasmalai Cheesecake", category: "desserts", price: "$33", description: "Fusion of Indian rasmalai with cheesecake", image: "cake.jpg" },
    { id: 304, name: "Ice Cream", category: "desserts", price: "$8", description: "Sweet chilled dessert", image: "icecream.jpg" },

    // Beverages
    { id: 401, name: "Mango Mastani", category: "beverages", price: "$32", description: "Thick mango milkshake with ice cream and dry fruits", image: "milkshake.jpg" },
    { id: 402, name: "Fresh Lime Soda", category: "beverages", price: "$6", description: "Refreshing lime soda, sweet or salty", image: "fresh-lime.jpg" },
    { id: 403, name: "Masala Chai", category: "beverages", price: "$5", description: "Traditional Indian spiced tea", image: "chai.jpg" },
    { id: 404, name: "Cappuccino", category: "beverages", price: "$5", description: "Rich espresso-based coffee with steamed milk", image: "cappuccino.jpg" },

    // Main Course
    { id: 501, name: "Butter Chicken", category: "main-course", price: "$18", description: "Chicken in rich tomato and butter gravy", image: "meals.jpg" },
    { id: 502, name: "Hyderabadi Biryani", category: "main-course", price: "$20", description: "Fragrant rice with marinated meat", image: "biryani.jpg" },
    { id: 503, name: "Grilled Peri-Peri Chicken", category: "main-course", price: "$22", description: "Spicy and smoky grilled chicken", image: "chicken.jpg" },
    { id: 504, name: "Chili Garlic Noodles", category: "main-course", price: "$25", description: "Spicy stir-fried noodles", image: "noodles.jpg" },
    { id: 505, name: "Salmon en Papillote", category: "main-course", price: "$35", description: "Baked salmon wrapped in parchment paper", image: "salmon.jpg" },
  ];
  
  // Signature Dishes
  const signatureDishes = [
    { id: 7, name: "Hyderabadi Biryani", description: "Fragrant rice with marinated meat, slow-cooked in dum style.", price: "$20", image: "/images/biryani.jpg", category: "main-course" },
    { id: 8, name: "Grilled Peri-Peri Chicken", description: "Spicy and smoky grilled chicken.", price: "$22", image: "/images/chicken.jpg", category: "main-course" },
    { id: 9, name: "Rasmalai Cheesecake", description: "Fusion of Indian rasmalai with cheesecake.", price: "$33", image: "/images/cheesecake.jpg", category: "desserts" },
    { id: 10, name: "Mango Mastani", description: "Thick mango milkshake with ice cream and dry fruits.", price: "$32", image: "/images/milkshake.jpg", category: "beverages" }
  ];

  useEffect(() => {
    const fetchMenuData = async () => {
      setLoading(true);
      try {
        // Fetch menu items
        const menuResponse = await MenuService.getAllMenus();
        console.log("✅ Full Menu API Response:", JSON.stringify(menuResponse, null, 2));
        
        // Properly handle the menu response
        let menuData = [];
        if (Array.isArray(menuResponse)) {
          menuData = menuResponse;
        } else if (menuResponse && Array.isArray(menuResponse.data)) {
          menuData = menuResponse.data;
        }
        
        // Transform API response to match expected format if necessary
        const formattedMenuItems = menuData.map(item => ({
          id: item._id || item.id,
          name: item.name,
          category: item.category?.trim().toLowerCase(),
          price: typeof item.price === 'number' ? `$${item.price}` : item.price,
          description: item.description || 'No description available',
          image: item.image,
          isAvailable: item.isAvailable !== false && item.availability !== false
        }));
        
        setMenuItems(formattedMenuItems);

        let categoriesList = [];

        try {
          const categoriesResponse = await MenuService.getAllCategories();
          console.log("✅ Raw categories data:", categoriesResponse);

          if (Array.isArray(categoriesResponse) && categoriesResponse.length > 0) {
            categoriesList = categoriesResponse.map((cat) => cat.trim().toLowerCase());
          } else {
            console.warn("⚠️ API returned no categories, extracting from menu items...");
          }
        } catch (err) {
          console.error("❌ Error fetching categories, extracting from menu items:", err);
        }

        if (categoriesList.length === 0 && formattedMenuItems.length > 0) {
          categoriesList = [...new Set(formattedMenuItems.map((item) => item.category?.trim().toLowerCase()).filter(Boolean))];
        }

        if (categoriesList.length === 0) {
          console.warn("⚠️ No categories found, using static fallback.");
          categoriesList = ["starters", "rice-breads", "main-course", "desserts", "beverages", "combo-meals"];
        }

        setCategories(categoriesList);
        
        // If there's a category parameter, load that category
        if (category) {
          handleViewCategory(category);
        }
      } catch (error) {
        console.error("❌ Error fetching menu data:", error);
        setError("Failed to load menu. Please try again.");
        setCategories(["starters", "rice-breads", "main-course", "desserts", "beverages", "combo-meals"]);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);
  
  useEffect(() => {
    if (category) {
      handleViewCategory(category);
    }

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("❌ Error parsing cart from localStorage:", e);
      }
    }
  }, [category]);

  const handleViewCategory = async (category) => {
    setSelectedCategory(category);
    setLoading(true);

    try {
      const normalizedCategory = category.trim().toLowerCase();
      console.log(`🔍 Fetching category: ${normalizedCategory}`);

      // Start with an empty array for items to show
      let itemsToShow = [];

      // First try to filter from already loaded menuItems (API items)
      const apiItems = menuItems.filter(
        item => item.category?.trim().toLowerCase() === normalizedCategory
      );
      
      // Add API items to our collection
      if (apiItems.length > 0) {
        itemsToShow = [...apiItems];
        console.log(`✅ Found ${apiItems.length} API items for category '${normalizedCategory}'`);
      }

      // If few or no items found, try to fetch more from API
      if (apiItems.length < 3) {
        try {
          const response = await MenuService.getItemsByCategory(normalizedCategory);
          console.log("✅ Additional Category API Response:", response);

          if (Array.isArray(response) && response.length > 0) {
            const newApiItems = response
              .filter(apiItem => {
                // Filter out items we already have (avoid duplicates)
                return !itemsToShow.some(existing => 
                  existing.id === apiItem._id || existing._id === apiItem._id || 
                  existing.name.toLowerCase() === apiItem.name.toLowerCase()
                );
              })
              .map(item => ({
                id: item._id || item.id,
                name: item.name,
                category: item.category?.trim().toLowerCase(),
                price: typeof item.price === 'number' ? `$${item.price}` : item.price,
                description: item.description || 'No description available',
                image: item.image,
                isAvailable: item.isAvailable !== false && item.availability !== false
              }));
              
            itemsToShow = [...itemsToShow, ...newApiItems];
            console.log(`✅ Added ${newApiItems.length} more API items from direct fetch`);
          }
        } catch (err) {
          console.warn(`⚠️ Error fetching additional category items from API: ${err.message}`);
        }
      }

      // Add static items that don't exist in API items
      const staticItems = allItems.filter(
        item => item.category?.trim().toLowerCase() === normalizedCategory
      );
      
      // Only add static items that don't match any API items by name
      const uniqueStaticItems = staticItems.filter(staticItem => {
        return !itemsToShow.some(existingItem => 
          existingItem.name.toLowerCase() === staticItem.name.toLowerCase()
        );
      });
      
      if (uniqueStaticItems.length > 0) {
        itemsToShow = [...itemsToShow, ...uniqueStaticItems];
        console.log(`✅ Added ${uniqueStaticItems.length} static items`);
      }

      console.log(`📋 Final items for '${normalizedCategory}': ${itemsToShow.length} total items`, itemsToShow);
      setCategoryItems(itemsToShow);
    } catch (error) {
      console.error(`❌ Error in handleViewCategory for '${category}':`, error);
      // Try to use static data as fallback
      const staticItems = allItems.filter(
        item => item.category?.trim().toLowerCase() === category.trim().toLowerCase()
      );
      setCategoryItems(staticItems);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderNow = (dishId, processedImageUrl) => {
    // First check in API menu items
    let item = menuItems.find(item => item.id === dishId || item._id === dishId);
    
    // If not found, check in static items
    if (!item) {
      item = [...allItems, ...signatureDishes].find(item => item.id === dishId);
    }

    if (item) {
      let updatedCart;
      const existingItemIndex = cart.findIndex(cartItem => 
        cartItem.id === dishId || cartItem._id === dishId
      );

      if (existingItemIndex !== -1) {
        updatedCart = [...cart];
        updatedCart[existingItemIndex].quantity += 1;
      } else {
        updatedCart = [...cart, { 
          ...item, 
          quantity: 1,
          image: processedImageUrl || getImageUrl(item.image, item.category)
        }];
      }

      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setShowCart(true);
    }
  };
  
  const handleBackToMenu = () => {
    setSelectedCategory(null);
    setCategoryItems([]);
    setShowCart(false);
    setOrderType(null);
    setShowPayment(false);
    setShowReservation(false);
  };

  const handleUpdateQuantity = (id, change) => {
    const updatedCart = cart.map(item => {
      if (item.id === id || item._id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  
  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id && item._id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = typeof item.price === "string"
        ? parseFloat(item.price.replace(/[^0-9.]/g, ""))
        : Number(item.price) || 0;
      return total + (price * (item.quantity || 1));
    }, 0).toFixed(2);
  };

  const handleProceedToCheckout = (type) => {
    setOrderType(type);

    if (type === 'delivery') {
      localStorage.setItem('cart', JSON.stringify(cart));
      setShowPayment(true);
      setShowCart(false);
    } else if (type === 'dine-in') {
      localStorage.setItem('cart', JSON.stringify(cart));
      setShowReservation(true);
      setShowCart(false);
    }
  };

  const submitOrder = async (orderDetails) => {
    try {
      setLoading(true);
      const orderData = {
        items: cart.map(item => ({
          itemId: item.id || item._id,
          name: item.name,
          quantity: item.quantity || 1,
          price: parseFloat(item.price.toString().replace(/[^0-9.]/g, ''))
        })),
        orderType: orderType,
        subtotal: parseFloat(calculateTotal()),
        tax: parseFloat((parseFloat(calculateTotal()) * 0.1).toFixed(2)),
        total: parseFloat((parseFloat(calculateTotal()) + parseFloat((parseFloat(calculateTotal()) * 0.1).toFixed(2))).toFixed(2)),
        ...orderDetails
      };

      const response = await OrderService.createOrder(orderData);

      // Clear cart after successful order
      setCart([]);
      localStorage.removeItem('cart');

      setLoading(false);

      return response.data;
    } catch (error) {
      console.error("Error submitting order:", error);
      setError("Failed to submit order. Please try again.");
      setLoading(false);
      throw error;
    }
  };

  const handleBackFromCheckout = () => {
    setShowPayment(false);
    setShowReservation(false);
    setShowCart(true);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="retry-button" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  // Show Payment Component
  if (showPayment) {
    return (
      <Payment
        cart={cart}
        orderType="delivery"
        subtotal={calculateTotal()}
        tax={(parseFloat(calculateTotal()) * 0.1).toFixed(2)}
        total={(parseFloat(calculateTotal()) + parseFloat((parseFloat(calculateTotal()) * 0.1).toFixed(2))).toFixed(2)}
        onBack={handleBackFromCheckout}
        onSubmitOrder={submitOrder}
      />
    );
  }

  // Show Reservation Component
  if (showReservation) {
    return (
      <Reservation
        cart={cart}
        orderType="dine-in"
        subtotal={calculateTotal()}
        tax={(parseFloat(calculateTotal()) * 0.1).toFixed(2)}
        total={(parseFloat(calculateTotal()) + parseFloat((parseFloat(calculateTotal()) * 0.1).toFixed(2))).toFixed(2)}
        onBack={handleBackFromCheckout}
        onSubmitOrder={submitOrder}
      />
    );
  }

  // Display Cart
  if (showCart) {
    return (
      <div className="menu-container">
        <div className="menu-header">
          <button className="back-button"
          style={{ backgroundColor: "#e74c3c", color: "white" }} onClick={handleBackToMenu}>
            ← Back to Menu
          </button>
          <h2 className="menu-title">Your Cart</h2>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty. Add some delicious items to get started!</p>
            <button className="order-button" onClick={handleBackToMenu}>
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="cart-container">
            <div className="cart-items">
              {cart.map((item, index) => (
                <div key={`cart-item-${index}-${item.id || item._id || ''}`}>
                  <div className="cart-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                      onError={(e) => {
                        console.error(`Failed to load image: ${e.target.src} for ${item.name}`);
                        const defaultImg = defaultImages[item.category] || generalFallbackImage;
                        e.target.src = defaultImg;
                        e.target.onerror = null;
                      }}
                    />
                    <div className="cart-item-details">
                      <h3>{item.name}</h3>
                      <p className="cart-item-price">{item.price}</p>
                    </div>
                    <div className="cart-item-actions">
                      <button
                        className="quantity-button"
                        onClick={() => handleUpdateQuantity(item.id || item._id, -1)}
                        disabled={(item.quantity || 1) <= 1}
                      >
                        -
                      </button>
                      <span className="item-quantity">{item.quantity || 1}</span>
                      <button
                        className="quantity-button"
                        onClick={() => handleUpdateQuantity(item.id || item._id, 1)}
                      >
                        +
                      </button>
                      <button
                        className="remove-button"
                        style={{ backgroundColor: "#e74c3c", color: "white" }}
                        onClick={() => handleRemoveItem(item.id || item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {index !== cart.length - 1 && <hr className="cart-divider" />}
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${calculateTotal()}</span>
              </div>
              <div className="summary-row">
                <span>Tax:</span>
                <span>${(parseFloat(calculateTotal()) * 0.1).toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${(parseFloat(calculateTotal()) + parseFloat((parseFloat(calculateTotal()) * 0.1).toFixed(2))).toFixed(2)}</span>
              </div>

              <div className="order-type-selection">
                <h4>Select Order Type:</h4>
                <button
                  className="order-type-button"
                  style={{ backgroundColor: "#e74c3c", color: "white" }}
                  onClick={() => handleProceedToCheckout('delivery')}
                >
                  Delivery
                </button>
                <button
                  className="order-type-button"
                  style={{ backgroundColor: "#e74c3c", color: "white" }}
                  onClick={() => handleProceedToCheckout('dine-in')}
                >
                  Dine-in
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Selected category view
  if (selectedCategory) {
    return (
      <div className="menu-container">
        <div className="menu-header">
          <button
            className="back-button"
            onClick={() => setSelectedCategory(null)}
          >
            ← Back to Menu
          </button>
          <h2 className="menu-title">
            {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          </h2>
          {cart.length > 0 && (
            <button
              className="view-cart-button"
              onClick={() => setShowCart(true)}
              style={{ backgroundColor: "#e74c3c", color: "white" }}
            >
              View Cart ({cart.length})
            </button>
          )}
        </div>

        <div className="menu-items">
          {categoryItems.length > 0 ? (
            categoryItems.map((item) => (
              <div key={`item-${item.id || item._id}`} className="menu-item">
                <img
                  src={getImageUrl(item.image, item.category)}
                  alt={item.name}
                  className="menu-item-image"
                  onError={(e) => {
                    console.log(`Failed to load image: ${e.target.src} for item: ${item.name}`);
                    // Try category default first
                    const defaultImg = defaultImages[item.category];
                    if (defaultImg && e.target.src !== defaultImg) {
                      e.target.src = defaultImg;
                    } else {
                      // If category default fails or is the same as the failed image, use general fallback
                      e.target.src = generalFallbackImage;
                    }
                    e.target.onerror = null;
                  }}
                />
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <span>{item.price}</span>
                <button 
                className="add-to-cart"
                style={{ backgroundColor: "#e74c3c", color: "white" }}
                onClick={() => handleOrderNow(item.id || item._id, getImageUrl(item.image, item.category))}>
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className="no-items-message">No items available in this category.</p>
          )}
        </div>
      </div>
    );
  }

  // Main menu view
  return (
    <div className="menu-container">
      {/* Cover Image Section - Replaced video with static image */}
      <div className="cover-image-container">
        <img 
          className="cover-image" 
          src="/images/menu.jpg" 
          alt="Savory Elegance Cover" 
          onError={(e) => {
            console.error("Failed to load cover image");
            e.target.src = generalFallbackImage;
            e.target.onerror = null;
          }}
        />
        <div className="image-overlay">
          <h1>Savory Elegance</h1>
          <p>Experience culinary excellence</p>
        </div>
      </div>

      <h2 className="menu-title">MENU</h2>
      <div className="menu-list">
        {categories.map((cat, index) => (
          <div key={`menu-category-${index}`} className="menu-item">
            <img
              src={defaultImages[cat] || generalFallbackImage}
              alt={cat}
            />
            <h3>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h3>
            <button
              className="order-button"
              onClick={() => handleViewCategory(cat)}
            >
              View
            </button>
          </div>
        ))}
      </div>

      <h2 className="menu-title">OUR SIGNATURE DISHES</h2>
      <div className="menu-list">
        {signatureDishes.map((dish, index) => (
          <div key={`sig-dish-${index}`} className="menu-item">
            <img 
              src={dish.image} 
              alt={dish.name} 
              onError={(e) => {
                const defaultImg = defaultImages[dish.category] || generalFallbackImage;
                e.target.src = defaultImg;
              }}
            />
            <h3>{dish.name}</h3>
            <p className="menu-description">{dish.description}</p>
            <p className="menu-price">
              {typeof dish.price === "string" ? dish.price : `$${dish.price.toFixed(2)}`}
            </p>

            <button
              className="add-to-cart"
              onClick={() => handleOrderNow(dish.id, dish.image)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Menu;