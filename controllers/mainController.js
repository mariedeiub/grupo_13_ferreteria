let carrito = [1,3,6,5]

const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsList.json');
const usersFilePath = path.join(__dirname, '../data/usersList.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const mainController = {
    index: (req, res) => {
        let condicion=false
        res.render('home',{condicion});
    },

    home: (req, res) => {
        let condicion=false
        res.render('home',{condicion});
    },

    carrito: (req, res) => {
        let pedido = [];
        let total = 0;
        let subtotal = 0;
        carrito.forEach(productoCarrito => {
            pedido.push(productos.find (producto => {return producto.id == productoCarrito}))
        })

        pedido.forEach(producto =>{
            subtotal += producto.precio
            total += producto.precio-(producto.precio * producto.descuento /100)
        })

        res.render('cart', {pedido, total, subtotal});
    },

    eliminarCarrito: (req,res) => {
        console.log("Elimino producto" + req.params.id)
        carrito = carrito.filter(producto => {
            return producto != req.params.id
        })

        res.redirect('/carrito')
    },

    cargar:(req, res) =>{
        carrito.push(req.params.id)
        res.redirect('/carrito')
    },

}

module.exports = mainController