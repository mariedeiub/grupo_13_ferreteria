const express = require('express');
const app = express();
const mainRouter = require('./src/routes/mainRouter')
let PORT = 3030;

//--------------------  APP LISTEN ------------------------//
app.listen(PORT, () => console.log("Servidor corriendo en el puerto: " + PORT));

//--------------------  MIDDLEWARE  ------------------------//
app.use(express.static('public'));



//--------------------  RUTAS ------------------------//
app.use('/', mainRouter)

app.get('/home', mainRouter)

app.get("/producto", mainRouter)

app.get("/carrito", mainRouter)

app.get("/register", mainRouter)

app.get("/login", mainRouter)

//-------------------NOT FOUND-----------------------------------//
app.get("/*", (req, res) => {
    res.status(404).send("404 NOT FOUND");
})

