const express = require('express');
const app = express();
const mainRouter = require('./routes/mainRouter')
const productsRouter= require ("./routes/productsRouter");
let PORT = 3030;

//--------------------  APP LISTEN ------------------------//
app.listen(PORT, () => console.log("Servidor corriendo en el puerto: " + PORT));

//--------------------  MIDDLEWARE  ------------------------//
app.use(express.static('public'));
app.use(express.json());

app.set('view engine', 'ejs');

//--------------------  RUTAS ------------------------//
app.use('/', mainRouter);

app.use("/productos", productsRouter);


//-------------------NOT FOUND-----------------------------------//
app.get("/*", (req, res) => {
    res.status(404).send("404 NOT FOUND");
})

