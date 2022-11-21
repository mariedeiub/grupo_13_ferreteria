const fs = require('fs');
const path = require('path');

const productsFilePath = path.join('./data/productsList.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const filtersFilePath = path.join('./data/filtersList.json');
const filtros = JSON.parse(fs.readFileSync(filtersFilePath, 'utf-8'));


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {
    categoria: (req, res) => {
        let listaProductos = productos.filter(producto=>{return producto.categoria == req.params.categoria}) 
        res.render('products', {listaProductos,filtros});
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