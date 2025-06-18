const express = require('express');
const router = express.Router();
const auth = require('../Middlewares/auth.middleware');
const { getCheckout , postCheckout} = require('../controllers/checkout.controller');



router.get('/checkout', auth, getCheckout);
router.post('/checkout', auth, postCheckout);

module.exports = router;
