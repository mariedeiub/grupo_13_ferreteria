const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

let db = require('../database/models');
const Categoria = require("../database/models/Categoria");

const productsFilePath = path.join(__dirname, "../data/productsList.json");
const productos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const filtersFilePath = path.join("./data/filtersList.json");
const filtros = JSON.parse(fs.readFileSync(filtersFilePath, "utf-8"));

const categoryFilePath = path.join("./data/categoryList.json");
const categorias = JSON.parse(fs.readFileSync(categoryFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {
  // LISTA DE PRODUCTOS POR CATEGORIA
  categoria: (req, res) => {
    //FILTRA PRODUCTOS A MOSTRAR EN CADA CATEGORIA
    let listaProductos = db.Categorias.findOne({where: {nombre: req.params.categoria}})
    .then(function(categoria){
      console.log(categoria.categoria_id)
      db.Productos.findAll({
        include: [
          {
            association: "categorias",
            where: {categoria_id : categoria.categoria_id}
          },
        ],
        raw: true,
        nest: true
      })
      .then(function(listaProductos){
        //FILTRA MARCAS A MOSTRAR EN CADA CATEGORIA
        let listaMarcas = [];
        listaProductos.forEach((producto) => {
          listaMarcas.push(producto.marca);
        });
        let marcas = [...new Set(listaMarcas)];

        //FILTRA COLORES A MOSTRAR EN CADA CATEGORIA
        let listaColores = [];
        listaProductos.forEach((producto) => {
          listaColores.push(producto.color);
        });
        let colores = [...new Set(listaColores)];

        //FILTRA TAMAÑOS A MOSTRAR EN CADA CATEGORIA
        let listaTamaños = [];
        listaProductos.forEach((producto) => {
          listaTamaños.push(producto.tamaño);
        });
        let tamaños = [...new Set(listaTamaños)];

        res.render("products", { listaProductos, marcas, colores, tamaños });
      })
    })

    
  },

  // DETALLE DEL PRODUCTO
  producto: (req, res) => {
    db.Productos.findByPk(req.params.id)
      .then(function(producto){
      
      res.render("producto", {producto})
    })
  },

  // FILTRAR
  filtrar: (req, res) => {
    let filtro = req.query.marca;

    // let listaFiltrada= []

    // productos.forEach(producto => {
    //     if(producto.marca == filtro){
    //         listaFiltrada.push(producto)
    //     }
    // });

    res.send(filtro);
    // res.render('products', {listaFiltrada});
  },

    //EDITAR PRODUCTO
    editar: (req, res) => {
    
      let productoObtenido = db.Productos.findByPk(req.params.id)
     
      let categoriasObtenidas = db.Categorias.findAll();

      let productoCategoria = db.ProductosCategorias.findAll({where: {producto_fk: req.params.id}})
     
      Promise.all([productoObtenido, categoriasObtenidas,productoCategoria])
      .then(function([producto, categorias,categoriasDelProducto]){
        console.log(categoriasDelProducto)
        res.render('product-edit-form', {producto, categorias});
      })

 
        // // MARCAR CATEGORIAS SELECCIONADAS DEL PRODUCTO A EDITAR  
        // 
        // categorias.forEach((categoria) => {
        //   if (producto.categoria.indexOf(categoria) >= 0){
        //     categoriaTrue = {nombre: categoria, estado: true}
        //     categoriasEdit.push(categoriaTrue);
        //   }
        //   else{
        //     categoriaTrue = {nombre: categoria, estado: false}
        //     categoriasEdit.push(categoriaTrue);
        //   }
        // });
        // console.log(categoriasEdit);

        // res.render('product-edit-form', {producto, categoriasEdit});
    },

    update: (req, res) => {
        let img;

        // MODIFICAR CUANDO CARGA LA IMAGEN QUE YA TIENE
        db.Productos.findByPk(req.params.id).then(function(producto){
          if(req.files.length > 0){
            img = "/images/" + req.files[0].filename;
          } else{
            console.log('Entro por imagen')
            img = producto.imagen;
          }
        })

        
        let producto = {
          nombre: req.body.nombre,
          marca: req.body.marca,
          tamanio: req.body.tamanio,
          color: req.body.color,
          precio: req.body.precio,
          fabricante: req.body.fabricante,
          modelo: req.body.modelo,
          stock: req.body.stock,
          descuento: req.body.descuento,
          imagen: img,
          descripcion: req.body.descripcion
        }

        console.log('modifica producto' + img);

        db.Productos.update(producto, 
                    {
                      where: {producto_id: req.params.id}
                    })

		  res.render("producto" , {producto} );

    },

    //ELIMINAR PRODUCTO
    eliminar : (req, res) => {
      db.Productos.destroy({
        where: {producto_id: req.params.id}
      })
		  res.redirect('/');
    },

    // CARGAR NUEVO PRODUCTO
    cargar: (req, res) => {
      res.render("forms", {categorias});
    },

    crear: (req, res) => {
      let errors = validationResult (req);


      if (errors.isEmpty()){
        let img;

        if(req.files.length > 0){
          img = "/images/" + req.files[0].filename;
        } else{
          img = 'default-image.png'
        }

        // USANDO BASE DE DATOS

        let producto = {
          nombre: req.body.nombre,
          marca: req.body.marca,
          tamanio: req.body.tamanio,
          color: req.body.color,
          precio: req.body.precio,
          fabricante: req.body.fabricante,
          modelo: req.body.modelo,
          stock: req.body.stock,
          descuento: req.body.descuento,
          imagen: img,
          descripcion: req.body.descripcion
        }

        db.Productos.create(producto);

        //CAMBIAR PARA QUE REDIRIJA A LA CATEGORIA CORRECTA
        res.redirect(`/productos/herramientas`);

      }else{
        res.render('forms', {errors : errors.array(), old: req.body, categorias})
      }
    }
}


module.exports = productsController;
