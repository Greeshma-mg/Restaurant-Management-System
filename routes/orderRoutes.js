const express = require("express");
const {
  getOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  updateOrderStatus, 
} = require("../controllers/orderController");
const router = express.Router();

router.get("/", getOrders);
router.post("/", createOrder);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

router.patch("/:id/status", updateOrderStatus);

module.exports = router;
