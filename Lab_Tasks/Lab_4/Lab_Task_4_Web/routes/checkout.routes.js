const express = require('express');
const router = express.Router();
const auth = require('../Middlewares/auth.middleware');
const Cart = require('../models/Cart');
const Order = require('../models/Order');


router.get('/checkout2', auth, (req, res) => {
  res.render('checkout2', { user: req.user });
});

router.post('/checkout', auth, async (req, res) => {
    const userId = req.session.user._id;

    try {
        await Cart.findOneAndDelete({ user: userId });
        res.redirect('/cart'); // or a success page
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/checkout', auth, async (req, res) => {
  const userId = req.session.user._id;
  console.log(userId);
  try {
    // const cart = await Cart.findOne({ user: userId });

    // if (!cart || cart.items.length === 0) {
    //   return res.status(400).send('Your cart is empty');
    // }

    // const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // const newOrder = new Order({
    //   user: userId,
    //   items: cart.items.map(item => ({
    //     product: item.product,
    //     quantity: item.quantity,
    //     price: item.price
    //   })),
    //   total: total,
    //   status: 'delivered',               
    //   paymentMethod: 'Cash on Delivery', 
    //   shippingAddress: req.body.addressId || undefined 
    // });
    // console.log(newOrder);

    // await newOrder.save();
    await Cart.findOneAndDelete({ user: userId });

    res.redirect('/cart'); 
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
