
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
const app = express();


const allowedOrigins = [
  "https://dazzling-sfogliatella-fee704.netlify.app", 
  "http://localhost:5173", 
];

app.use(cors({
  origin: (origin, callback) => {
  
    if (!origin) return callback(null, true);

 
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

   
    if (/^https:\/\/[a-z0-9-]+\.netlify\.app$/.test(origin)) {
      return callback(null, true);
    }

 
    return callback(new Error("Not allowed by CORS"), false);
  },
  credentials: true, 
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],  
}));

app.options("*", cors());

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/menu", require("./routes/menuRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/restaurants", require("./routes/restaurantRoutes"));

app.get("/", (req, res) => res.send("✅ Welcome to RestaurantPro API"));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
