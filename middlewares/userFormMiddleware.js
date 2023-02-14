const {body, check} = require ('express-validator')

console.log("Valida usuario")

const userFormMiddleware = [
    check('nombre').notEmpty().withMessage('Debes completar el campo Nombre'),
    check('apellido').notEmpty().withMessage('Debes completar el campo Apellido'),
    check('edad').notEmpty().withMessage('Debes completar el campo Edad'),
    check('direccion').notEmpty().withMessage('Debes completar el campo Direccion'),
    check('localidad').notEmpty().withMessage('Debes completar el campo Localidad'),
    check('pais').notEmpty().withMessage('Debes completar el campo Pais'),
    check('email')
        .notEmpty().withMessage('Debes completar el campo Correo electronico')
        .isEmail().withMessage('Debe ingrear un Email valido'),
    check('nombreUsuario')
        .notEmpty().withMessage('Debes completar el campo Nombre usuario')
        .isLength({min:8, max:20}).withMessage("El nombre de usuario debe tener como minimo 8 caracteres y maximo 20 caracteres"),
    check('contraseña')
        .notEmpty().withMessage('Debes completar el campo Contraseña')
        .isLength({min:8, max:20}).withMessage("La contraseña debe tener como minimo 8 caracteres y maximo 20 caracteres"),
    check('repetirContraseña')
        .notEmpty().withMessage('Debes completar el campo Repetir Contraseña')   
        .isLength({min:8, max:20}).withMessage("La contraseña debe tener como minimo 8 caracteres y maximo 20 caracteres")
      
    
]

module.exports = userFormMiddleware;