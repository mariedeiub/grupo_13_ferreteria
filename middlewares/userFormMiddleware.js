const {body} = require ('express-validator')

console.log("Valida usuario")

const userFormMiddleware = [
    body('nombre').notEmpty().withMessage('Debes completar el campo Nombre'),
    body('apellido').notEmpty().withMessage('Debes completar el campo Apellido'),
    body('edad').notEmpty().withMessage('Debes completar el campo Edad'),
    body('direccion').notEmpty().withMessage('Debes completar el campo Direccion'),
    body('localidad').notEmpty().withMessage('Debes completar el campo Localidad'),
    body('pais').notEmpty().withMessage('Debes completar el campo Pais'),
    body('email')
        .notEmpty().withMessage('Debes completar el campo Correo electronico')
        .isEmail().withMessage('Debe ingrear un Email valido'),
    body('nombreUsuario')
        .notEmpty().withMessage('Debes completar el campo Nombre usuario')
        .isLength({min:8, max:20}).withMessage("El nombre de usuario debe tener como minimo 8 caracteres y maximo 20 caracteres"),
    body('contrasenia')
        .notEmpty().withMessage('Debes completar el campo Contraseña')
        .isLength({min:8, max:20}).withMessage("La contraseña debe tener como minimo 8 caracteres y maximo 20 caracteres"),
    body('repetirContrasenia')
        .notEmpty().withMessage('Debes completar el campo Repetir Contraseña')   
        .isLength({min:8, max:20}).withMessage("La contraseña debe tener como minimo 8 caracteres y maximo 20 caracteres")
        .custom((value, {req}) => {
            if (value !== req.body.contrasenia) {
                throw new Error('Las contraseñas no coinciden')
            }
            return true; 
        }),
    
]

module.exports = userFormMiddleware;