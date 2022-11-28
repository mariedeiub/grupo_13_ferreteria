const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.index);

router.get('/home', mainController.home);

// router.get('/detalle/:id', mainController.detalle);


// VER CARRITO DE COMPRAS
router.get('/carrito', mainController.carrito);

// ELIMINAR PRODUCTO DEL CARRITO DE COMPRAS
router.post('/carrito/eliminar/:id/', mainController.eliminarCarrito);

router.get('/registro', mainController.registro);

router.get('/login', mainController.login);

module.exports = router