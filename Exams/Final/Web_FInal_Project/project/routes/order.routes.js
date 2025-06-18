
const express = require('express');
const router = express.Router();
const isUser = require('../Middlewares/auth.middleware');
const { postOrder, getOrders, updateOrder, deleteOrder } = require('../controllers/orders.controller');

router.post('/', isUser, postOrder);
router.get('/', isUser, getOrders);
router.put('/:id', updateOrder);
router.delete('/:id', isUser, deleteOrder);

module.exports = router;
