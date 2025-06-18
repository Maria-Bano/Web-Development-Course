const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const isAdmin = require('../Middlewares/isAdmin');
const isUser = require('../Middlewares/auth.middleware');
const { getProducts, addNewProduct, postaddProduct, getEditForm, postUpdateProduct, postDeleteProduct } = require('../controllers/product.controller');

router.get('/admin/products', isUser, isAdmin, getProducts);
router.get('/admin/products/new', isUser , isAdmin, addNewProduct);
router.post('/admin/products', isUser , isAdmin, postaddProduct);
router.get('/admin/products/:id/edit', isUser , isAdmin, getEditForm);
router.post('/admin/products/:id', isUser , isAdmin, postUpdateProduct);
router.post('/admin/products/:id/delete', isUser, isAdmin, postDeleteProduct);


module.exports = router;
