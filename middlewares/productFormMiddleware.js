const {body} = require ('express-validator')


const productFormMiddleware = [
    body('nombre').notEmpty().withMessage('Debes completar el campo Nombre'),
    body('marca').notEmpty().withMessage('Debes completar el campo Marca'),
    body('tamanio').notEmpty().withMessage('Debes completar el campo Tamaño'),
    body('precio').notEmpty().withMessage('Debes completar el campo Precio'),
    body('stock').notEmpty().withMessage('Debes completar el campo Stock'),
    body('categoria').notEmpty().withMessage('Debes seleccionar al menos una categoria')
]

module.exports = productFormMiddleware;