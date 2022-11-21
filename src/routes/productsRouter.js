const express = require('express');
const productsRouter = express.Router();
const productsController = require('../controllers/productsController');

productsRouter.get('/:categoria', productsController.categoria);

productsRouter.get('/detalle', productsController.detalle);

productsRouter.get('/cargar', productsController.cargar);

module.exports = productsRouter