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
    detalle: (req, res) =>{
        let producto = productos.find(producto => producto.id == req.params.id)
        res.render('detail', {producto});
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

    //EDITAR
    editar: (req, res) => {
        let producto = productos.find(producto => producto.id == req.params.id)
        console.log(producto)
        res.render('product-edit-form', {producto});
    }
}

module.exports = productsController