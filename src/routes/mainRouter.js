const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.index);

router.get('/home', mainController.home);

router.get('/products', mainController.product);

router.get('/cart', mainController.cart);

router.get('/register', mainController.register);

router.get('/login', mainController.login);

module.exports = router