const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const session = require('express-session');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const Product = require('./models/Product');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const isUser = require('./Middlewares/auth.middleware');
const checkoutRoutes = require('./routes/checkout.routes');
const orderRoutes = require('./routes/order.routes');
const adminRoutes = require('./routes/admin.routes');
const MongoStore = require('connect-mongo');
const cartRoutes = require('./routes/cart.routes')


connectDB();


const app = express();

app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "Maria",
  resave: false, // no modification allowed
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: "mongodb://localhost:27017/EcommereceProject",
    collectionName: 'sessions'
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 5 } // 5 days
}));


app.use('/auth' , authRoutes);
app.use('/user', userRoutes);
app.use('/cart/' , cartRoutes);
app.use('/admin',adminRoutes);
app.use('/', productRoutes);
app.use('/', checkoutRoutes);
app.use('/orders', orderRoutes);



app.get('/', isUser , async (req, res) => {
    try {
        const user = req.user? req.user : false;
        const products = await Product.find({});
        res.render('homepage', { products, user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading products');
    }
});





// 10. Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
