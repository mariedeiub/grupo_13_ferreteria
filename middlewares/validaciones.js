const fs=require('fs')
const {body, check} = require ('express-validator')
console.log("Valida usuario22")
const userFormMiddleware =[
    check('email').isEmail().withMessage('Email invalido'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
]
module.exports = userFormMiddleware;