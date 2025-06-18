const User = require('../models/User');
const bcrypt = require('bcryptjs');



exports.getLogin = (req, res) => {
    res.render('auth/login');
};

exports.getRegister = (req, res) => {
    res.render('auth/register');
}

exports.postRegister = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword
    });
    newUser.profileImage = "/images/users/" +  req.file.filename;

    await newUser.save();
    res.redirect('/auth/login');
  } catch (err) {
    res.render('error/registerationfailed');
  }
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }
        req.session.user = user;
        res.cookie('Token', user._id.toString(), {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 *5,
            path: '/'
        });
        if(user.role == 'user'){
          res.redirect('/');
        }else{
          res.redirect('/admin')
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in');
    }
};

exports.getLogout =  (req, res) => {
    res.clearCookie('Token', { path: '/' });
    res.redirect('/');
}
