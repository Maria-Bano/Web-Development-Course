const express = require('express');
const router = express.Router();
const isAdmin = require('../Middlewares/isAdmin'); 
const Product = require('../models/Product');
const { findById } = require('../models/User');

// Admin dashboard route
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.render('admin/dashboard', {
    title: 'Admin Dashboard',
    user: req.user,
    products
  });
});


router.get('/products/add' , (req,res)=> {
    res.render('admin/add')
})

router.post('/products/add' , async(req,res)=>{
    const { name,price,image,description,category,stock } = req.body;
    const product = new Product({name,price,imageUrl:image,description,category,quantityInStock:stock});
    await product.save();
    res.redirect('/admin/products/add');    
})


// Show edit form
router.get('/products/edit/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render('admin/edit', { product, user: req.user });
  } catch (err) {
    console.error(err);
    res.redirect('/admin/dashboard');
  }
});

// Handle update
router.post('/products/edit/:id', async (req, res) => {
  try {
    const { name, price, description, image, stock } = req.body;

    await Product.findByIdAndUpdate(req.params.id, {
      name,
      price,
      description,
      image,
      stock
    });

    res.redirect('/admin/');
  } catch (err) {
    console.error(err);
    res.redirect('/admin/');
  }
});


router.post('/products/:id',async (req, res) => {
    
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        console.log(product);
        res.redirect('/admin/');
    }
    catch(err) {
        console.error(err);
        res.redirect('/admin/');
        }
    })

module.exports = router;
