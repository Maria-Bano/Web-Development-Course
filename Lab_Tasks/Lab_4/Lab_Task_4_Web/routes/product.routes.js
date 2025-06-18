const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const isAdmin = require('../Middlewares/isAdmin');

// Admin - view all products
router.get('/admin/products', isAdmin, async (req, res) => {
  const products = await Product.find();
  res.render('products/list', { products });
});

// Admin - form to add a product
router.get('/admin/products/new', isAdmin, (req, res) => {
  res.render('products/add');
});

// Admin - create product
router.post('/admin/products', isAdmin, async (req, res) => {
  const { name, price, image, description, category, stock } = req.body;
  await Product.create({ name, price, image, description, category, stock });
  res.redirect('/admin/products');
});

// Admin - edit form
router.get('/admin/products/:id/edit', isAdmin, async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('products/edit', { product });
});

// Admin - update product
router.post('/admin/products/:id', isAdmin, async (req, res) => {
  const { name, price, image, description, category, stock } = req.body;
  await Product.findByIdAndUpdate(req.params.id, {
    name, price, image, description, category, stock
  });
  res.redirect('/admin/products');
});

// Admin - delete product
router.post('/admin/products/:id/delete', isAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/admin/products');
});




router.get('/products/detail/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('products/detail', { title: product.name, product , user : req.user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
