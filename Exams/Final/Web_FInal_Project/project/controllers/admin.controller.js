const Product = require('../models/Product');
const User=require('../models/User')
const Order=require('../models/Order');

exports.getDashboard= async (req, res) => {
  const products = await Product.find();
  console.log(req.user);
  res.render('admin/dashboard', {
  title: 'Admin Dashboard',
    admin: req.user,
    products
  });
}

exports.getAddForm =(req,res)=> {
    res.render('admin/add' , {admin : req.user})
}

exports.postAddProduct = async(req,res)=>{
    const { name,price,image,description,category,stock } = req.body;
    const product = new Product({name,price,imageUrl:image,description,category,quantityInStock:stock});
    await product.save();
    res.redirect('/admin/products/add');
}

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.render('admin/users', {
    title: 'All Users',
    admin: req.user,
    users
  });
}

exports.getOrders = async (req, res) => {
  const orders = await Order.find().populate('user').populate('items.product');
  res.render('admin/orders', {
    title: 'All Orders',
    admin: req.user,
    orders
  });
}

exports.getEditForm =async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render('admin/edit', { product, admin: req.user });
  } catch (err) {
    console.error(err);
    res.redirect('/admin/dashboard');
  }
}

exports.postEditForm =  async (req, res) => {
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
}

exports.deleteProduct = async (req, res) => {
  try {
      const product = await Product.findByIdAndDelete(req.params.id);
      res.redirect('/admin/');
  }
  catch(err) {
    console.error(err);
    res.redirect('/admin/');
  }
}
const Complaint = require('../models/Complaint');

exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('userId').populate('orderId');
    res.render('admin/complaint', { complaints , user : req.user});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}