// routes/order.routes.js

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const isUser = require('../Middlewares/auth.middleware');

// POST /orders - Place new order
router.post('/', isUser, async (req, res) => {
  try {
    const { items, total, paymentMethod, shippingAddress } = req.body;

    const order = new Order({
      user: req.user._id,
      items,
      total,
      paymentMethod,
      shippingAddress
    });

    await order.save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error placing order' });
  }
});

// GET /orders - Get current user's orders
router.get('/', isUser, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.product');
    res.render('orders/index', { orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

// PUT /orders/:id - Update order status (admin-only if needed)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ message: 'Order status updated', updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating order' });
  }
});

// DELETE /orders/:id - Cancel order (user or admin)
router.delete('/:id', isUser, async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!order) return res.status(404).json({ error: 'Order not found or unauthorized' });

    res.json({ message: 'Order cancelled' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting order' });
  }
});

module.exports = router;
