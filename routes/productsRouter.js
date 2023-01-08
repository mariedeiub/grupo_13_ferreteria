const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer = require ('multer');
const path = require('path');
// const productFormMiddleware = require ('../middlewares/productFormMiddleware');

// const {body} = require ('express-validator')

// const productFormMiddleware = [
    
//     body('nombre').notEmpty().withMessage('Debes completar el campo Nombre'),
//     body('marca').notEmpty().withMessage('Debes completar el campo Marca'),
//     body('tamanio').notEmpty().withMessage('Debes completar el campo Tamaño'),
//     body('precio').notEmpty().withMessage('Debes completar el campo Precio'),
//     body('stock').notEmpty().withMessage('Debes completar el campo Stock'),
//     body('categoria').notEmpty().withMessage('Debes seleccionar al menos una categoria')
// ]


// ************ Configuracion Multer para los midleware ************
const storage = multer.diskStorage({
    
    destination: function(req, file, cb){
        cb(null, 'public/images/')
    },

    filename: function(req,file,cb){
        const uniqueSuffix = Date.now() + path.extname(file.originalname)

        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer ({storage: storage})


// NUEVO PRODUCTO
router.get('/cargar', productsController.cargar);
router.post('/crear/', upload.any(''), productsController.crear);

// DETALLE DEL PRODUCTO
router.get('/producto/:id/', productsController.producto);

router.get('/filtrar', productsController.filtrar)

// EDITAR PRODUCTO
router.get('/editar/:id/', productsController.editar);
router.put('/editar/:id/', upload.any(''), productsController.update)

router.delete('/delete/:id/',productsController.eliminar)

router.get('/:categoria/', productsController.categoria);

module.exports = router