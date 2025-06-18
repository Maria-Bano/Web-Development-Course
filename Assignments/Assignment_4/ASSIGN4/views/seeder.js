const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost/your-db-name')
    .then(() => {
        return Product.insertMany([
            {
                name: 'Laptop',
                description: 'A powerful machine for developers',
                price: 999.99,
                imageUrl: 'https://via.placeholder.com/200',
                category: 'Electronics'
            },
            {
                name: 'Phone',
                description: 'A smart phone with cool features',
                price: 499.99,
                imageUrl: 'https://via.placeholder.com/200',
                category: 'Mobile'
            }
        ]);
    })
    .then(() => {
        console.log('Dummy products inserted');
        mongoose.disconnect();
    })
    .catch(err => console.error(err));
