const express = require('express');
const router = express.Router();
const isUser = require('../Middlewares/auth.middleware')
const { getDetails, getContact, getAbout, getProfile , submitForm} = require('../controllers/user.controller');


router.get('/profile', isUser, getProfile);
router.get('/aboutus' , isUser , getAbout);
router.get('/contactus' , isUser , getContact);
router.get('/products/:id', getDetails);

router.post('/submit-complaint' , isUser , submitForm);


module.exports = router;
