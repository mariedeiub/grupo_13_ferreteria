const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.index);

router.get('/home', mainController.home);

// router.get('/detalle/:id', mainController.detalle);

router.get('/carrito', mainController.carrito);

router.get('/registro', mainController.registro);

router.get('/login', mainController.login);

module.exports = router