const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/usersList.json");
const usuarios = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const usersController = {
    // LOGIN 
    login: (req, res) => {
        res.render('login');
    },

    // REGISTER
    registro: (req, res) => {
        res.render('register');
    },

    registrar: (req, res) => {
      let errors = validationResult (req);
      console.log(validationResult(req))

      if (errors.isEmpty()){
        console.log("DATOS CORRECTOS")
        let img;

        if(req.files.length > 0){
          img = "/images/users/" + req.files[0].filename;
        } else{
          img = 'default-image.png'
        }

        const usuario = { id: usuarios[usuarios.length - 1].id + 1, ...req.body ,"foto": img};
        const usuarioARegistrar = [...usuarios, usuario]
      
        fs.writeFileSync(
          productsFilePath,
          JSON.stringify(usuarioARegistrar, null, "")
        );

        // res.redirect(`/productos/${producto.categoria[0]}`);

      }else{
        console.log("Entra por errores")
        res.render('register', {errors : errors.array(), old: req.body})
      }
    },

    // DETALLE DEL USUARIO
    // usuario: (req, res) => {
    //     let usuario = usuarios.find((usuario) => usuario.id == req.params.id);
    //     res.render("usuario", { usuario });
    // },


    // //EDITAR PRODUCTO
    // editar: (req, res) => {
    //     let producto = productos.find(producto => producto.id == req.params.id)
    //     res.render('product-edit-form', {producto, categorias});
    // },

    // update: (req, res) => {
    //     let producto = productos.find(producto => producto.id == req.params.id);


    //     let img;

    //     if(req.files.length > 0){
    //       img = "/images/" + req.files[0].filename;
    //     } else{
    //       img = producto.foto;
    //     }

    //     let editandoProducto = {
	// 		  "id": producto.id,
    //     //modificar para que lo seleccione
    //     "categoria": req.body.categoria,
    //     "nombre": req.body.nombre,
    //     "marca": req.body.marca,
    //     "tamanio": req.body.tamanio,
    //     "color": req.body.color,
    //     "fabricante": req.body.fabricante,
    //     "precio": req.body.precio,
    //     "descuento": req.body.descuento,
    //     //modificar para que seleccione la foto
    //     "foto": img,
    //     "descripcion": req.body.descripcion,
    //     "stock": req.body.stock,
    //     "modelo": req.body.modelo,
	// 	  };


    //   console.log(editandoProducto)

    //   let productoEditado = productos.map(producto => {
    //     if (editandoProducto.id == producto.id){
    //       return producto = editandoProducto;
    //     };
	// 		return producto
	// 	});

	// 	fs.writeFileSync(productsFilePath, JSON.stringify(productoEditado, null, ''));

	// 	res.render("producto" , {producto} );

    // },

    // //ELIMINAR PRODUCTO
    // eliminar : (req, res) => {
	// 	let id =  req.params.id;
	// 	let productToDelete=productos.filter(producto=>producto.id != id)
	// 	fs.writeFileSync(productsFilePath ,JSON.stringify(productToDelete,null,'\t'));
	// 	res.redirect('/');
    // },

    // // CARGAR NUEVO PRODUCTO
    // cargar: (req, res) => {
    //   const errores = [];
    //   res.render("forms", {categorias});
    // },

    
}


module.exports = usersController;