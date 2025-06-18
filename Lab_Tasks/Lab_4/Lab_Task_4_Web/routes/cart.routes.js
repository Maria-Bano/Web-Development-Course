const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const auth = require('../Middlewares/auth.middleware'); // assuming you have this

router.get('/cart', auth, async (req, res) => {
    const userId = req.session.user._id;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.render('cart', { cartItems: [], total: 0 });
        }

        const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        res.render('cart', {
            cartItems: cart.items,
            total
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


router.post('/add-to-cart/:id', auth, async (req, res) => {
    const productId = req.params.id;
    const userId = req.session.user._id;

    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).send('Product not found');

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.product.toString() === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({
                product: product._id,
                quantity: 1,
                price: product.price
            });
        }

        await cart.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


module.exports  = router;