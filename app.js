const express = require('express');
const app = express();
const path = require('path');
const index = "./views/home.html";
const cart = "./views/cart.html";
const detail = "./views/detail.html";
const register = "./views/register.html";
const login = "./views/login.html";
let PORT = 3030;

app.use(express.static('public'));

app.listen(PORT, () => console.log("Servidor corriendo en el puerto: " + PORT));

//--------------------  PAGINA PRINCIPAL ------------------------//
app.get('/', (req, res) => {
    res.sendFile(path.resolve(index));
})

app.get('/home', (req, res) => {
    res.sendFile(path.resolve(index));
})

//------------------- DETALLE PRODUCTO --------------------------//
app.get("/producto", (req, res) => {
    res.sendFile(path.resolve(detail));
})

//-------------------CARRITO DE COMPRA --------------------------//
app.get("/carrito", (req, res) => {
    res.sendFile(path.resolve(cart));
})

//------------------- REGISTRO DE CUENTA ------------------------//
app.get("/register", (req, res) => {
    res.sendFile(path.resolve(register));
})

//------------------- INICIO DE SECCION ------------------------//
app.get("/login", (req, res) => {
    res.sendFile(path.resolve(login));
})

//-------------------NOT FOUND-----------------------------------//
app.get("/*", (req, res) => {
    res.status(404).send("404 NOT FOUND");
})

