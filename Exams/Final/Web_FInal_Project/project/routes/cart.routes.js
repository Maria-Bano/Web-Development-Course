const express = require('express');
const router = express.Router();
const {getCart, addtoCart, updateCart, removefromCart, toggleWishlist}=require('../controllers/cart.controller')
const auth = require('../Middlewares/auth.middleware');


router.get('/', auth, getCart);

router.post('/add-to-cart/:id', auth,addtoCart );

router.post('/update', auth, updateCart);

router.post('/remove/:id', auth, removefromCart);

router.post('/wishlist/:id', auth, toggleWishlist);

module.exports  = router;
