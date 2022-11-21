let carrito = [1,3,6]

const fs = require('fs');
const path = require('path');

const productsFilePath = path.join('./data/productsList.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const mainController = {
    index: (req, res) => {
        res.render('home');
    },

    home: (req, res) => {
        res.render('home');
    },

    product: (req, res) => {
        res.render('detail');
    },

    cart: (req, res) => {
        let pedido = [];
        carrito.forEach(productoCarrito => {
            pedido.push(productos.find (producto => {return producto.id == productoCarrito}))
        })
        res.render('cart', {pedido});
    },

    register: (req, res) => {
        res.render('register');
    },

    login: (req, res) => {
        res.render('login');
    }
}

module.exports = mainController