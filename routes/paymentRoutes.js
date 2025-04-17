const express = require("express");
const { processPayment, getPayments, updatePayment, deletePayment } = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, processPayment);

router.get("/", getPayments);

router.patch("/:id", updatePayment);

router.delete("/:id", deletePayment);

module.exports = router;
