const express = require('express');
const productsRouter = express.Router();
const productsController = require('../controllers/productsController');

productsRouter.get('/herramientas', productsController.herramientas);

productsRouter.get('/pinturas', productsController.pinturas);

productsRouter.get('/griferia', productsController.griferia);

productsRouter.get('/pileta', productsController.pileta);

productsRouter.get('/jardineria', productsController.jardineria);

productsRouter.get('/detalle', productsController.detalle);

productsRouter.get('/cargar', productsController.cargar);

module.exports = productsRouter