const express = require('express');
const router = express.Router();
const User = require('../models/User');
const isUser = require('../Middlewares/auth.middleware')
const Order = require('../models/Order');
const Review = require('../models/Review');


router.get('/profile', isUser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'orders',
        populate: {
          path: 'items.product', 
          select: 'name price image'
        }
      })
      .populate({
        path: 'reviews',
        populate: {
          path: 'product',
          select: 'name image'
        }
      });

    res.render('auth/profile', {
      user: {
        ...user.toObject(),
        interests: user.interests || [],
        phone: user.phone || ""
      },
      orders: user.orders || [],
      reviews: user.reviews || [],
      wishlist: []
    });

  } catch (err) {
    console.error('Error loading profile:', err);
    res.status(500).send('Server Error while loading profile');
  }
});


module.exports = router;