const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  items: [{
    product: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['delivered'],  // only 'delivered' allowed
    default: 'delivered'  // always default to delivered
  },
  paymentMethod: {
    type: String,
    enum: ['Cash on Delivery'],  // only 'Cash on Delivery' allowed
    default: 'Cash on Delivery',
    required: true
  },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Order', orderSchema);
