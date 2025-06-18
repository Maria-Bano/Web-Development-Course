const Cart = require('../models/Cart');
const User = require('../models/User');
const Product = require('../models/Product');

exports.getCart=async (req, res) => {
    const userId = req.session.user._id;
    const user = req.user;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.render('user/cart', {
                cartItems: [],
                subtotal: 0,
                shipping: 0,
                discount: 0,
                tax: 0,
                estimatedTotal: 0,
                user
            });
        }

        const cartItems = cart.items;
        const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = subtotal > 35 ? 0 : 5.99;
        const discount = 0; // Update with logic if needed
        const tax = parseFloat((subtotal * 0.1).toFixed(2)); // assuming 10% tax
        const estimatedTotal = subtotal + shipping - discount + tax;

        res.render('user/cart', {
            cartItems, subtotal, shipping, discount, tax, estimatedTotal, user
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}


exports.addtoCart=async (req, res) => {
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
}

exports.updateCart=async (req, res) => {
    const userId = req.session.user._id;
    const { productId, action } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).send('Cart not found');

        const item = cart.items.find(i => i.product.toString() === productId);
        if (!item) return res.status(404).send('Product not in cart');

        if (action === 'increase') {
            item.quantity += 1;
        } else if (action === 'decrease') {
            item.quantity = Math.max(item.quantity - 1, 1); // Prevent 0
        }

        await cart.save();
        res.redirect('/cart');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

exports.removefromCart=async (req, res) => {
  const userId = req.session.user._id;
  const productId = req.params.id;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).send('Cart not found');

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();

    res.redirect('/cart');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}

exports.toggleWishlist=async (req, res) => {
  const userId = req.session.user._id;
  const productId = req.params.id;

  try {
    const user = await User.findById(userId);

    const index = user.wishlist.indexOf(productId);
    if (index === -1) {
      user.wishlist.push(productId);
    } else {
      user.wishlist.splice(index, 1);
    }

    await user.save();
    res.redirect(req.get('referer'));
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}
