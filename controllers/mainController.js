let carrito = [1,3,6]

const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsList.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const mainController = {
    index: (req, res) => {
        res.render('home');
    },

    home: (req, res) => {
        res.render('home');
    },

    // detalle: (req, res) => {
    //     res.render('detail');
    // },

    carrito: (req, res) => {
        let pedido = [];
        carrito.forEach(productoCarrito => {
            pedido.push(productos.find (producto => {return producto.id == productoCarrito}))
        })
        res.render('cart', {pedido});
    },

    registro: (req, res) => {
        res.render('register');
    },

    login: (req, res) => {
        res.render('login');
    }
}

module.exports = mainController