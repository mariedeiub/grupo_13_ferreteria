const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsList.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const filtersFilePath = path.join('./data/filtersList.json');
const filtros = JSON.parse(fs.readFileSync(filtersFilePath, 'utf-8'));


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {

    // MOSTRAR TODOS LOS PRODUCTOS
	// index: (req, res) => {
	// 	res.render('products', {productos})
	// },

    // LISTA DE PRODUCTOS POR CATEGORIA
    categoria: (req, res) => {
        //FILTRA PRODUCTOS A MOSTRAR EN CADA CATEGORIA
        let listaProductos = productos.filter(function (producto){
            if (producto.categoria.indexOf(req.params.categoria) >= 0){
            return producto
            }
        });

        //FILTRA MARCAS A MOSTRAR EN CADA CATEGORIA
        let listaMarcas = []
        listaProductos.forEach(producto => {
            listaMarcas.push(producto.marca)
        });      
        let marcas = [... new Set(listaMarcas)]        

        //FILTRA COLORES A MOSTRAR EN CADA CATEGORIA
        let listaColores = []
        listaProductos.forEach(producto => {
            listaColores.push(producto.color)
        });      
        let colores = [... new Set(listaColores)]    

        //FILTRA TAMAÑOS A MOSTRAR EN CADA CATEGORIA
        let listaTamaños = []
        listaProductos.forEach(producto => {
            listaTamaños.push(producto.tamaño)
        });      
        let tamaños = [... new Set(listaTamaños)]        

        res.render('products', {listaProductos, marcas, colores, tamaños});
    },

    // DETALLE DEL PRODUCTO
    producto: (req, res) =>{
        let producto = productos.find(producto => producto.id == req.params.id)
        res.render('producto', {producto});
    },

    // CARGAR PRODUCTO
    cargar: (req, res) => {
        res.render('forms');
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

        res.send(filtro)
        // res.render('products', {listaFiltrada});
    },

    //EDITAR PRODUCTO
    editar: (req, res) => {
        let producto = productos.find(producto => producto.id == req.params.id)
        res.render('product-edit-form', {producto});
    },

    update: (req, res) => {
        let producto = productos.find(producto => producto.id == req.params.id);

        let editandoProducto = {
			"id": producto.id,
			"nombre": req.body.nombre,
			"marca": req.body.marca,
			"tamaño": req.body.tamaño,
			"color": req.body.color,
			"fabricante": req.body.fabricante,
            "precio": req.body.precio,
            "descuento": req.body.descuento,
            "foto": req.body.foto,
            "descripcion": req.body.descripcion,
            "stock": req.body.stock,
            "modelo": req.body.modelo,
		};

        let productoEditado = productos.map(producto => {
			if (editandoProducto.id == producto.id){
				return producto.id = editandoProducto.id;
			};
			return producto
		});

		fs.writeFileSync(productsFilePath, JSON.stringify(productoEditado, null, '/t'));

		res.redirect("/detail", {producto});

    },

    //ELIMINAR PRODUCTO
    eliminar : (req, res) => {
		let id =  req.params.id;
		let productToDelete=productos.filter(producto=>producto.id != id)
		fs.writeFileSync(productsFilePath ,JSON.stringify(productToDelete,null,'\t'));
		res.redirect('/');
    }
}

module.exports = productsController