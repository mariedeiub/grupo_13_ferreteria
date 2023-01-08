const {body} = require ('express-validator')

const userFormMiddleware = [
    body('nombre').notEmpty().withMessage('Debes completar el campo Nombre'),
    body('apellido').notEmpty().withMessage('Debes completar el campo Apellido'),
    body('direccion').notEmpty().withMessage('Debes completar el campo Direccion'),
    body('localidad').notEmpty().withMessage('Debes completar el campo Localidad'),
    body('pais').notEmpty().withMessage('Debes completar el campo Pais'),
    body('email').notEmpty().withMessage('Debes completar el campo Correo electronico'),
    body('nombre-usuario').notEmpty().withMessage('Debes completar el campo Nombre usuario'),
    body('contraseña').notEmpty().withMessage('Debes completar el campo Contraseña'),
    body('repetir-contraseña').notEmpty().withMessage('Debes completar el campo Repetir Contraseña'),   
]

module.exports = userFormMiddleware;