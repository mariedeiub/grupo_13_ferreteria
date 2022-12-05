const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// router.get('/', productsController.index)

router.get('/cargar', productsController.cargar);

router.get('/:categoria/', productsController.categoria);

router.get('/producto/:id/', productsController.producto);

router.get('/filtrar', productsController.filtrar)

router.get('/editar/:id/', productsController.editar);
router.post('/:id/', productsController.update)

router.delete('/delete/:id/',productsController.eliminar)

module.exports = router