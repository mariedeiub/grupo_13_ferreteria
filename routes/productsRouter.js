const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// router.get('/', productsController.index)

//router.post('/', productsController.index)
router.get('/crear/', productsController.crear)

router.get('/cargar', productsController.cargar);

router.get('/producto/:id/', productsController.producto);

router.get('/filtrar', productsController.filtrar)

router.get('/editar/:id/', productsController.editar);

router.post('/:id/', productsController.update)

router.delete('/delete/:id/',productsController.eliminar)

router.get('/:categoria/', productsController.categoria);

module.exports = router