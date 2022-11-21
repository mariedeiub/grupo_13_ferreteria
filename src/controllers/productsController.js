const fs = require('fs');
const path = require('path');

const productsFilePath = path.join('./data/productsList.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const filtersFilePath = path.join('./data/filtersList.json');
const filtros = JSON.parse(fs.readFileSync(filtersFilePath, 'utf-8'));


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {
    herramientas: (req, res) => {
        let listaProductos = productos.filter(producto=>{return producto.categoria == "herramienta"}) 
        res.render('products', {listaProductos,filtros});
    },

    pinturas: (req, res) => {
        let listaProductos = productos.filter(producto=>{return producto.categoria == "pintura"}) 
        res.render('products', {listaProductos, filtros});
    },

    griferia: (req, res) => {
        let listaProductos = productos.filter(producto=>{return producto.categoria == "griferia"}) 
        res.render('products', {listaProductos, filtros});
    },

    pileta: (req, res) => {
        let listaProductos = productos.filter(producto=>{return producto.categoria == "pileta"}) 
        res.render('products', {listaProductos, filtros});
    },

    jardineria: (req, res) => {
        let listaProductos = productos.filter(producto=>{return producto.categoria == "jardineria"}) 
        res.render('products', {listaProductos, filtros});
    },

    detalle: (req, res) =>{
        let producto = productos.find(producto => producto.id == req.params.id)
        console.log(producto)
        res.render('products', {producto});
    },
    cargar: (req, res) => {
        res.render('forms');
    },
}

module.exports = productsController