const mongoose = require("mongoose");
const Payment = require("../models/Payment");

// Process a new payment
const processPayment = async (req, res) => {
    try {
        const { user, order, amount, paymentMethod, transactionId } = req.body;

        if (!user || !order || !amount || !paymentMethod || !transactionId) {
            return res.status(400).json({ error: "All fields are required, including Transaction ID" });
        }

        const payment = new Payment({
            user,
            order,
            amount,
            paymentMethod,
            transactionId,
            status: "Paid",
        });

        await payment.save();
        res.status(201).json({ message: "Payment successful", payment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all payments
const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate("user").populate("order");
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching payments", error: error.message });
    }
};

// Update a payment by ID
const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPayment = await Payment.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        res.json({ message: "Payment updated successfully", payment: updatedPayment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a payment by ID
const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPayment = await Payment.findByIdAndDelete(id);

        if (!deletedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        res.json({ message: "Payment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = { processPayment, getPayments, updatePayment, deletePayment };
