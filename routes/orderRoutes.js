const express = require("express");
const {
  getOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  updateOrderStatus, // ✅ Make sure this is imported
} = require("../controllers/orderController");
const router = express.Router();

router.get("/", getOrders);
router.post("/", createOrder);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

// ✅ PATCH route for updating order status
router.patch("/:id/status", updateOrderStatus);

module.exports = router;
