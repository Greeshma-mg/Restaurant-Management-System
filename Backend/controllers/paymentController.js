const mongoose = require("mongoose");
const Payment = require("../models/Payment"); 

const processPayment = async (req, res) => {
    try {
        const { user, order, amount, paymentMethod } = req.body;

     
        if (!user || !order || !amount || !paymentMethod) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userId = new mongoose.Types.ObjectId(user);

        const newPayment = new Payment({ user: userId, order, amount, paymentMethod });
        await newPayment.save();

        res.status(201).json({ message: "Payment processed successfully", payment: newPayment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate("user").populate("order"); 
        res.status(200).json(payments); 
    } catch (error) {
        res.status(500).json({ message: "Error fetching payments", error: error.message });
    }
};

module.exports = { processPayment, getPayments };
