const express = require('express');
const router = express.Router();
const isAdmin = require('../Middlewares/isAdmin');
const isUser = require('../Middlewares/auth.middleware');

const { getDashboard, getAddForm, postAddProduct, getUsers, getOrders, getEditForm, postEditForm, deleteProduct,getComplaints } = require('../controllers/admin.controller');

router.get('/', isUser, isAdmin, getDashboard);
router.get('/products/add' ,  isUser, isAdmin,getAddForm)
router.post('/products/add' , postAddProduct)
router.get('/users', isUser, isAdmin, getUsers);
router.get('/orders', isUser, isAdmin, getOrders);
router.get('/products/edit/:id', isUser,isAdmin,getEditForm);
router.post('/products/edit/:id',postEditForm);
router.post('/products/:id',deleteProduct);
router.get('/complaints' ,isUser, isAdmin, getComplaints)

module.exports = router;
