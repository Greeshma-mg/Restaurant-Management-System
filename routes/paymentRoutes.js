const express = require("express");
const { processPayment, getPayments, updatePayment, deletePayment } = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Create a new payment
router.post("/", protect, processPayment);

// Get all payments
router.get("/", getPayments);

// Update a payment by ID
router.patch("/:id", updatePayment);

// Delete a payment by ID
router.delete("/:id", deletePayment);

module.exports = router;
