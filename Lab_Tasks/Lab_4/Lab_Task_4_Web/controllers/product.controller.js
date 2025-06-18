const Product = require('../models/Product');

// Show all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.render('products/', {
            title: 'All Products',
            products
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching products');
    }
};




exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('products/detail', { product });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};
