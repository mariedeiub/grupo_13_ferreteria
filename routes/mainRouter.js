const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const multer = require('multer');
const upload = multer();

router.get('/', mainController.index);

router.get('/home', mainController.home);

// router.get('/detalle/:id', mainController.detalle);


// VER CARRITO DE COMPRAS
router.get('/carrito', mainController.carrito);

// SUMAR AL CARRITO
router.post('/carrito/sumar/:id/', mainController.cargar);

// ELIMINAR PRODUCTO DEL CARRITO DE COMPRAS
router.post('/carrito/eliminar/:id/', mainController.eliminarCarrito);

router.get('/registro', mainController.registro);

router.get('/login', mainController.login);

router.use(upload.array()); 
router.use(express.static('public'));

router.post('/register', mainController.register);

module.exports = router