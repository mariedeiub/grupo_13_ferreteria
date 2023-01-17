const User = require("../models/User");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const bcrypt = require ('bcrypt');
const bcryptjs = require ('bcryptjs');
const sal = bcrypt.genSaltSync(10);

const usersFilePath = path.join(__dirname, "../data/usersList.json");
const usuarios = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const usersController = {
    // LOGIN 
    login: (req, res) => {
  
        return res.render('login');
    },

    // REGISTRO
    registro: (req, res) => {
        res.render('register');
    },

    //NUEVO USUARIO
    registrar: (req, res) => {
      let errors = validationResult (req);
      console.log(validationResult(req));

      if (errors.isEmpty()){
        console.log("DATOS CORRECTOS")
        let img;

        req.body.contrasenia = bcrypt.hashSync(req.body.contrasenia,10);

        const usuario = { 
            id: usuarios[usuarios.length - 1].id + 1, 
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            direccion: req.body.direccion,
            localidad: req.body.localidad,
            edad: req.body.edad,        
            email: req.body.email,
            nombreUsuario: req.body.nombreUsuario,
            tipoUsuario: req.body.tipoUsuario,
            contrasenia: req.body.contrasenia
            };
        const usuarioARegistrar = [...usuarios, usuario]
      
        fs.writeFileSync(
          usersFilePath,
          JSON.stringify(usuarioARegistrar, null, "")
        );
        console.log(usuarioARegistrar)

        res.redirect('/');

      }else{
        console.log("Entra por errores")
        res.render('register', {errors : errors.array(), old: req.body})
      }
    },

    processLogin: (req, res) => {
      let userToLogin=User.findByField('email', req.body.email)
      let condicion=true
      console.log('processLogin')
      if (userToLogin){
        console.log('Entre al login')
        let isOkThepassword=  bcrypt.compareSync(req.body.contrasenia,userToLogin.contrasenia)
        if (isOkThepassword) {
          console.log('Logueado')
          delete userToLogin.password;
          req.session.userLogged=userToLogin;
            
            return  res.render('home',{user:req.session.userLogged,condicion:true});
            }
           } 
           
           console.log('Error login')
        return res.render('login',{
          errors:{
            password:{
              msg:'el email o la contraseña estan mal'
            }}})
       
      },


      logout:(req,res)=> {
        req.session.destroy();
        return res.redirect('/')

      }
}


module.exports = usersController;