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
    
      //BUSCO PRODUCTO A EDITAR
      let productoObtenido = db.Productos.findByPk(req.params.id)
     
      //BUSCO LISTADO DE CATEGORIAS
      let categoriasObtenidas = db.Categorias.findAll();
      
      //BUSCO LISTADO DE CATEGORIAS RELACIONADAS AL PRODUCTO
      let categoriasDelProducto = db.ProductoCategorias.findAll({where: {producto_fk : req.params.id}})
     
      Promise.all([productoObtenido, categoriasObtenidas, categoriasDelProducto])
      .then(function([producto, categorias, categoriasSelect]){
        let categoriasEdit = [];
        let categoriaTrue;

        //ARMO ARRAY CON LAS CATEGORIAS A MARCAR EN EL CHECKBOX
        categorias.forEach((categoria) => {
              if (categoriasSelect.find(c => c.categoria_fk == categoria.categoria_id)){
                categoriaTrue = {nombre: categoria.nombre, estado: true,  id: categoria.categoria_id}
                categoriasEdit.push(categoriaTrue);
              }
              else{
                categoriaTrue = {nombre: categoria.nombre, estado: false, id: categoria.categoria_id}
                categoriasEdit.push(categoriaTrue);
              }
          });

          console.log(categoriasEdit)

        res.render('product-edit-form', {producto, categoriasEdit});
      })
    },

    update: (req, res) => {
        let img;

        // MODIFICAR CUANDO CARGA LA IMAGEN QUE YA TIENE
        db.Productos.findByPk(req.params.id)
        .then(function(producto){
          if(req.files.length > 0){
            img = "/images/" + req.files[0].filename;
          } else{
            img = producto.imagen;
          }

          let productoUpdate = {
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
  
          //ACTUALIZA TABLA RE PRODUCTOS
          db.Productos.update(productoUpdate, 
                      {
                        where: {producto_id: req.params.id}
                      })

          let categoriasId= Array.from(req.body.categoria);
          //ELIMINO TODOS LOS REGISTROS DE LA TABLA INTERMEDIA PARA VOLVERLO A CARGAR
          db.ProductoCategorias.destroy({
            where: {producto_fk: producto.producto_id}
          })

          categoriasId.forEach(e => {
          // CARGA TABLA INTERMEDIA PRODUCTO-CATEGORIA
            db.ProductoCategorias.upsert({
              producto_fk: producto.producto_id,
              categoria_fk: e
            })
          })

          res.render("producto" , {producto} )
        })
      
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
      db.Categorias.findAll()
      .then(categorias=>{
        res.render("forms", {categorias});
      })
    },

    crear: (req, res) => {
      let errors = validationResult (req);
      
      let categoriasId= Array.from(req.body.categoria);

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

        db.Productos.create(producto)

        .then(product => {
          categoriasId.forEach(e => {
            // CARGA TABLA INTERMEDIA PRODUCTO-CATEGORIA
            db.ProductoCategorias.create({
              producto_fk: product.producto_id,
              categoria_fk: e
            })
          })
        })
        .then( () =>{
          res.redirect(`/productos/herramientas`);
        })
        .catch((error) => console.log(error));


      }else{
        res.render('forms', {errors : errors.array(), old: req.body, categorias})
      }
    }
}


module.exports = productsController;
