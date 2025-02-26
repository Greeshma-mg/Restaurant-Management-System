const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();

const userRoutes = require("./routes/userRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const paymentRoutes = require("./routes/paymentRoutes")
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();


app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log(" MongoDB Connected"))
    .catch((err) => {
        console.error(" Database Connection Error:", err.message);
        process.exit(1); 
    });


app.use("/api/users", userRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to RestaurantPro API");
});

app.use((err, req, res, next) => {
    console.error(" Internal Server Error:", err);
    res.status(500).json({ message: "Something went wrong!" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
