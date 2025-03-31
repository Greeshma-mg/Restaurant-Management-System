const Order = require("../models/Order");
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("customer", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    console.log(" Received Order Request:", req.body);
    
    let { customer, items, totalAmount, status } = req.body;

    
    if (!customer || !items || items.length === 0 || !totalAmount || !status) {
      console.log(" Missing fields in request body");
      return res.status(400).json({ message: "All fields are required" });
    }

    const mongoose = require("mongoose");
    if (!mongoose.Types.ObjectId.isValid(customer)) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    const newOrder = new Order({
      customer,
      items,
      totalAmount,
      status,
    });

    const savedOrder = await newOrder.save();
    console.log(" Order Saved:", savedOrder);

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(" Error in createOrder:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("customer", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: "Status is required" });

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
