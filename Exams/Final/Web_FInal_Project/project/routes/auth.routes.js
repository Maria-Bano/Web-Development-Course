const express = require('express');
const upload = require('../Middlewares/multerConfig');
const router = express.Router();
const { getLogin, getRegister, postRegister, postLogin, getLogout }  = require('../controllers/auth.controller')



router.get('/login', getLogin);
router.get('/register', getRegister);
router.post('/register', upload.single('images') , postRegister);
router.post('/login', postLogin);
router.get('/logout', getLogout);

module.exports = router;
