const Order = require("../models/Order");

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.addOrderItems = async (req, res) => {
  const { items, totalPrice } = req.body;

  if (items && items.length === 0) {
    res.status(400).json({ message: "No order items" });
    return;
  } else {
    const order = new Order({
      studentId: req.user._id,
      items,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ studentId: req.user._id });
  res.json(orders);
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
exports.getOrders = async (req, res) => {
  const orders = await Order.find({}).populate("studentId", "id name");
  res.json(orders);
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = req.body.status || order.status;
    const updatedOrder = await order.save();

    // Emit socket event for real-time update
    if (global.io) {
      global.io.emit("orderUpdated", updatedOrder);
    }

    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};
