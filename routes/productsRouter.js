const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// router.get('/', productsController.index)

router.get('/:categoria', productsController.categoria);

router.get('/detalle/:id', productsController.detalle);

router.get('/filtrar', productsController.filtrar)

router.get('/cargar', productsController.cargar);

router.get('/editar/:id', productsController.editar);

module.exports = router