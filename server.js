const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();

// ✅ Improved CORS Configuration for Netlify
const allowedOrigins = [
  "https://dazzling-sfogliatella-fee704.netlify.app",
  "https://6808e4ac66d7e16f9237553c--dazzling-sfogliatella-fee704.netlify.app", 
  "http://localhost:3000" // For local development
];

app.use(
  cors({
    origin: function(origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      // Check if origin is in our explicit allowlist
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      // Check if origin matches Netlify deploy preview pattern
      const netlifyPreviewPattern = /^https:\/\/[a-z0-9]+-+-dazzling-sfogliatella-fee704\.netlify\.app$/;
      if (netlifyPreviewPattern.test(origin)) {
        return callback(null, true);
      }
      
      return callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);

// ✅ Handle preflight requests (OPTIONS)
app.options("*", cors());

// ✅ Set CORS headers directly for any issues with the cors package
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Check if origin should be allowed
  if (!origin) {
    return next();
  }
  
  // Check explicit allowlist
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    // Check pattern match
    const netlifyPreviewPattern = /^https:\/\/[a-z0-9]+-+-dazzling-sfogliatella-fee704\.netlify\.app$/;
    if (netlifyPreviewPattern.test(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
  }

  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  
  next();
});

// ✅ Middleware
app.use(express.json());

// ✅ Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/restaurant-management", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// ✅ Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/menu", require("./routes/menuRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/restaurants", require("./routes/restaurantRoutes"));

// ✅ Root route
app.get("/", (req, res) => {
  res.send("✅ Welcome to RestaurantPro API");
});

// ✅ Error handlers
app.use(notFound);
app.use(errorHandler);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));