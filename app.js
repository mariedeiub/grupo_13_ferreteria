const express = require('express');
const app = express();
const mainRouter = require('./src/routes/mainRouter')
const productsRouter= require ("./src/routes/productsRouter");
let PORT = 3030;

//--------------------  APP LISTEN ------------------------//
app.listen(PORT, () => console.log("Servidor corriendo en el puerto: " + PORT));

//--------------------  MIDDLEWARE  ------------------------//
app.use(express.static('public'));

app.set('view engine', 'ejs');

//--------------------  RUTAS ------------------------//
app.use('/', mainRouter);

app.use('/home', mainRouter);

app.use("/products", mainRouter);

app.use("/carrito", mainRouter);

app.use("/register", mainRouter);

app.use("/login", mainRouter);

app.use("/productos", productsRouter);

//-------------------NOT FOUND-----------------------------------//
app.get("/*", (req, res) => {
    res.status(404).send("404 NOT FOUND");
})

