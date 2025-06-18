const Cart = require('../models/Cart');
const User = require('../models/User');
const Order = require('../models/Order');

exports.getCheckout = (req, res) => {
  res.render('user/checkout', { user: req.user });
}

exports.postCheckout =  async (req, res) => {
  const userId = req.session.user._id;
  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).send('Your cart is empty');
    }

    const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const newOrder = new Order({
      user: userId,
      items: cart.items.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price
      })),
      total: total,
      status: 'delivered',
      paymentMethod: 'Cash on Delivery',
      shippingAddress: req.body.addressId || undefined
    });

    await newOrder.save();
    await User.findByIdAndUpdate(userId, {
      $push: { orders: newOrder._id }
    });
    await Cart.findOneAndDelete({ user: userId });

    res.redirect('/cart');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}
