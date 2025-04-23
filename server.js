// server.js

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
const app = express();

// ——— CORS Setup ———
const allowedOrigins = [
  "https://dazzling-sfogliatella-fee704.netlify.app",  // Production URL
  "http://localhost:5173",  // Local development URL
];

app.use(cors({
  origin: (origin, callback) => {
    // 1) Allow requests from no-origin (mobile apps, curl, Postman, etc.)
    if (!origin) return callback(null, true);

    // 2) Exact match whitelist
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // 3) Allow any Netlify preview subdomain: *.netlify.app
    if (/^https:\/\/[a-z0-9-]+\.netlify\.app$/.test(origin)) {
      return callback(null, true);
    }

    // 4) Reject all others
    return callback(new Error("Not allowed by CORS"), false);
  },
  credentials: true,  // Allow credentials (cookies, headers, etc.) for cross-origin requests
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],  // Allow headers for content-type and authorization
}));

// Handle preflight OPTIONS requests
app.options("*", cors());

// ——— JSON + Static Middleware ———
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ——— MongoDB Connection ———
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// ——— Routes ———
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/menu", require("./routes/menuRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/restaurants", require("./routes/restaurantRoutes"));

app.get("/", (req, res) => res.send("✅ Welcome to RestaurantPro API"));

// ——— Error Handlers ———
app.use(notFound);
app.use(errorHandler);

// ——— Start Server ———
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
