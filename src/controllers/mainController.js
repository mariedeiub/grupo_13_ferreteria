let listaProducts= [
    {
        id:1,
        categoria: "pintura",
        nombre: "Pintura",
        marca: "Alba",
        tamaño: "20ls",
        color: "blanco",
        precio: "19.800",
        descuento: "10%",
        foto: "/images/pintura-alba.png",
        url: "/detalle/1"
    },
    {
        id:2,
        categoria: "herramienta",
        nombre: "Cortadora de ceramicos",
        marca: "Zonta",
        tamaño: "64cm",
        color: "rojo",
        precio: "61.200",
        descuento: "20%",
        foto: "/images/producto1.png",
        url: "/products"
    },
    {
        id:3,
        categoria: "herramienta",
        nombre: "Taladro",
        marca: "Omaha",
        tamaño: "1800W",
        color: "rojo",
        precio: "29.200",
        descuento: " ",
        foto: "/images/img-taladro-omaha.png",
        url: "/detalle/3"
    },
    {
        id:4,
        categoria: "herramienta",
        nombre: "Cierra caladora",
        marca: "Philco",
        tamaño: "350W",
        color: "verde",
        precio: "5.600",
        descuento: "15%",
        foto: "/images/img-cierra-caladora.png",
        url: "/detalle/4"
    },
    {
        id:5,
        categoria: "pintura",
        nombre: "Pintura",
        marca: "Tersuave",
        tamaño: "4Ls",
        color: "azul",
        precio: "6.700",
        descuento: "30%",
        foto: "/images/img-pintura-azul.png",
        url: "/detalle/5"
    },
    {
        id:6,
        categoria: "herramienta",
        nombre: "Amoladora Angular",
        marca: "Bosch",
        tamaño: "900W",
        color: "azul",
        precio: "24.300",
        descuento: "10%",
        foto: "/images/img-amoladora-bosch.png",
        url: "/products"
    },

];

let carrito = [1,4,3]

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
            pedido.push(listaProducts.find (producto => {return producto.id == productoCarrito}))
        })
        console.log(pedido);
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