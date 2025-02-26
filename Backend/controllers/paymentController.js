const mongoose = require("mongoose");
const Payment = require("../models/Payment"); // Import Payment model

// Process a payment and save to the database
const processPayment = async (req, res) => {
    try {
        const { user, order, amount, paymentMethod } = req.body;

        // Validate required fields
        if (!user || !order || !amount || !paymentMethod) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Convert user ID to ObjectId
        const userId = new mongoose.Types.ObjectId(user);

        // Create and save the payment record
        const newPayment = new Payment({ user: userId, order, amount, paymentMethod });
        await newPayment.save();

        res.status(201).json({ message: "Payment processed successfully", payment: newPayment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all payments from the database
const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate("user").populate("order"); // Fetch all payments with user and order details
        res.status(200).json(payments); // Return actual payments
    } catch (error) {
        res.status(500).json({ message: "Error fetching payments", error: error.message });
    }
};

module.exports = { processPayment, getPayments };
