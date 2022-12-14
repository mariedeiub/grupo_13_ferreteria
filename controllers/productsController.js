const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsList.json");
const productos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const filtersFilePath = path.join("./data/filtersList.json");
const filtros = JSON.parse(fs.readFileSync(filtersFilePath, "utf-8"));

const categoryFilePath = path.join("./data/categoryList.json");
const categorias = JSON.parse(fs.readFileSync(categoryFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {
  // MOSTRAR TODOS LOS PRODUCTOS
  // index: (req, res) => {
  // 	res.render('products', {productos})
  // },

  // LISTA DE PRODUCTOS POR CATEGORIA
  categoria: (req, res) => {
    //FILTRA PRODUCTOS A MOSTRAR EN CADA CATEGORIA
    let listaProductos = productos.filter(function (producto) {
      if (producto.categoria.indexOf(req.params.categoria) >= 0) {
        return producto;
      }
    });

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
  },

  // DETALLE DEL PRODUCTO
  producto: (req, res) => {
    let producto = productos.find((producto) => producto.id == req.params.id);
    res.render("producto", { producto });
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
    
        let producto = productos.find(producto => producto.id == req.params.id)

        // MARCAR CATEGORIAS SELECCIONADAS DEL PRODUCTO A EDITAR  
        let categoriasEdit = [];
        categorias.forEach((categoria) => {
          if (producto.categoria.indexOf(categoria) >= 0){
            categoriaTrue = {nombre: categoria, estado: true}
            categoriasEdit.push(categoriaTrue);
          }
          else{
            categoriaTrue = {nombre: categoria, estado: false}
            categoriasEdit.push(categoriaTrue);
          }
        });
        console.log(categoriasEdit);

        res.render('product-edit-form', {producto, categoriasEdit});
    },

    update: (req, res) => {
        let producto = productos.find(producto => producto.id == req.params.id);

        console.log("VOY A EDITAR")
        let img;

        if(req.files.length > 0){
          img = "/images/" + req.files[0].filename;
        } else{
          img = producto.foto;
        }

        let editandoProducto = {
			  "id": producto.id,
        //modificar para que lo seleccione
        "categoria": req.body.categoria,
        "nombre": req.body.nombre,
        "marca": req.body.marca,
        "tamanio": req.body.tamanio,
        "color": req.body.color,
        "fabricante": req.body.fabricante,
        "precio": req.body.precio,
        "descuento": req.body.descuento,
        //modificar para que seleccione la foto
        "foto": img,
        "descripcion": req.body.descripcion,
        "stock": req.body.stock,
        "modelo": req.body.modelo,
		  };


      console.log(editandoProducto)

      let productoEditado = productos.map(producto => {
        if (editandoProducto.id == producto.id){
          return producto = editandoProducto;
        };
			return producto
		});

		fs.writeFileSync(productsFilePath, JSON.stringify(productoEditado, null, ''));

		res.render("producto" , {producto} );

    },

    //ELIMINAR PRODUCTO
    eliminar : (req, res) => {
		let id =  req.params.id;
		let productToDelete=productos.filter(producto=>producto.id != id)
		fs.writeFileSync(productsFilePath ,JSON.stringify(productToDelete,null,'\t'));
		res.redirect('/');
    },

    // CARGAR NUEVO PRODUCTO
    cargar: (req, res) => {
      const errores = [];
      res.render("forms", {categorias});
    },

    crear: (req, res) => {
      let errors = validationResult (req);
      console.log(validationResult(req))

      if (errors.isEmpty()){
        console.log("DATOS CORRECTOS")
        let img;

        if(req.files.length > 0){
          img = "/images/" + req.files[0].filename;
        } else{
          img = 'default-image.png'
        }

        const producto = { id: productos[productos.length - 1].id + 1, ...req.body ,"foto": img};
        const productosAPublicar = [...productos, producto]
      
        fs.writeFileSync(
          productsFilePath,
          JSON.stringify(productosAPublicar, null, "")
        );

        res.redirect(`/productos/${producto.categoria[0]}`);

      }else{
        console.log("Entra por errores")
        res.render('forms', {errors : errors.array(), old: req.body, categorias})
      }
    }
}


module.exports = productsController;
