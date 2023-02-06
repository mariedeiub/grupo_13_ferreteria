
const db = require('../database/models');
const sequelize = db.sequelize;
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const bcrypt = require ('bcrypt');
const bcryptjs = require ('bcryptjs');
const { Sequelize } = require("../database/models");
const sal = bcrypt.genSaltSync(10);
const Op=Sequelize.Op

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
    processLogin: (req, res) =>{
   
      // let contraseña;
      // let email;
      // req.session.userLogged = email
      
   
        
     // res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })  
      db.Usuarios.findOne({
        where:{email: req.body.email
        }})  
      .then( (user) => {
        if (bcrypt.compareSync(req.body.contraseña, user.contraseña)){
          req.session.userLogged = user;
          if(req.body.remember_user) {
            res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
          }
          res.render('home',{user})
        }
        else {
          res.render('login', {
            errors: {
              email: {
                msg: 'La contraseña es incorrecta'
              }
            }
          });
        }
          
        })
        .catch (err=>{
          res.render('login', {
            errors: {
              email: {
                msg: 'error de conexion'
              }
            }
          })})
    
/*let contraseña=req.body.contraseña
    db.Usuarios.findOne(contraseña)
    .then( console.log("contraseña valida"))
    .catch(err=>console.log(err));*/


     /* let password=req.body.contraseña
    let usuarioContraseña=bcrypt.compareSync(req.body.contrasenia, userToLogin.contrasenia);
      */

    },
    /*
      if(userToLogin) {
        let isOkThePassword = bcrypt.compareSync(req.body.contrasenia, userToLogin.contrasenia);
        if (isOkThePassword) {
          delete userToLogin.contrasenia;
          req.session.userLogged = userToLogin;
  
          if(req.body.remember_user) {
            res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
          }
           return res.render('home', {
            user: req.session.userLogged.email
          });
        } 
        return  res.render('login', {
          errors: {
            email: {
              msg: 'La contraseña es incorrecta'
            }
          }
        });
      }
  
      return  res.render('login', {
        errors: {
          password: {
            msg: ' Email invalido'
          }
        }
      });
    },
    
  */
    logout: (req, res) => {
      res.clearCookie('userEmail');
      req.session.destroy();
      return res.redirect('/');
    }
  }



module.exports = usersController;