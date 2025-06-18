const Order = require('../models/Order');
const Review = require('../models/Review');
const Product = require('../models/Product');
const Complaint = require('../models/Complaint');
const User = require('../models/User');

exports.getDetails = async (req, res) => {
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
}


exports.getContact = (req , res)=>{
  res.render('user/contactus' , {user : req.user});
}

exports.getAbout = (req , res)=>{
  res.render('user/aboutus' , {user : req.user});
}



exports.getProfile =  async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'orders',
        populate: {
          path: 'items.product',
          select: 'name price imageUrl'
        }})
        .populate({
        path: 'wishlist',
        model: 'Product',
        select: 'name price imageUrl createdAt'
      });

    const complaints = await Complaint.find({userId : req.user._id});
    console.log(complaints);
    res.render('user/profile', {
      user: {
        ...user.toObject(),
        interests: user.interests || [],
        phone: user.phone || ""
      },
      complaints,
      orders: user.orders || [],
      reviews: user.reviews || [],
      wishlist: user.wishlist || []
    });

  } catch (err) {
    console.error('Error loading profile:', err);
    res.status(500).send('Server Error while loading profile');
  }
}



exports.submitForm = async (req, res) => {
  const userId = req.user._id;
  const { orderId, message } = req.body;

  try {
    const order = await Order.findOne({ _id: orderId});

    if (!order) {
      return res.status(404).send('❌ Order not found or does not belong to you.');
    }

    const complaint = new Complaint({
      userId,
      orderId,
      message,
      timestamp: new Date()
    });

    await complaint.save();
    res.send('✅ Complaint submitted successfully.');
  } catch (err) {
    console.error(err);
    res.status(500).send('🚨 Server error. Please try again later.');
  }
};