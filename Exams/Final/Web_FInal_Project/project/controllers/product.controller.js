const Product = require('../models/Product');

// // Show all products
// exports.getAllProducts = async (req, res) => {
//     try {
//         const products = await Product.find({});
//         res.render('products/', {
//             title: 'All Products',
//             products
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error fetching products');
//     }
// };

// exports.getProductById = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);
//         if (!product) {
//             return res.status(404).send('Product not found');
//         }
//         res.render('products/detail', { product });
//     } catch (error) {
//         res.status(500).send('Server Error');
//     }
// };


exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.render('admin/list', { products ,admin:req.user});
}

exports.addNewProduct = (req, res) => {
  res.render('admin/add' , {admin : req.user});
}

exports.postaddProduct = async (req, res) => {
  const { name, price, image, description, category, stock } = req.body;
  await Product.create({ name, price, image, description, category, stock });
  res.redirect('/admin/products');
}

exports.getEditForm =  async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('products/edit', { product });
}

exports.postUpdateProduct = async (req, res) => {
  const { name, price, image, description, category, stock } = req.body;
  await Product.findByIdAndUpdate(req.params.id, {
    name, price, image, description, category, stock
  });
  res.redirect('/admin/products');
}

exports.postDeleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/admin/products');
}
