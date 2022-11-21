const express = require('express');
const productsRouter = express.Router();
const productsController = require('../controllers/productsController');

productsRouter.get('/:categoria', productsController.categoria);

productsRouter.get('/detalle/:id', productsController.detalle);

productsRouter.get('/filtrar', productsController.filtrar)

productsRouter.get('/cargar', productsController.cargar);

module.exports = productsRouter