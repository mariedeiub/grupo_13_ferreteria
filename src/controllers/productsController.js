let listaProducts= [
    {
        id:1,
        categoria: "pintura",
        nombre: "Pintura",
        marca: "Alba",
        tamaño: "20ls",
        color: "blanco",
        precio: "19.800",
        descuento: "%10",
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
        descuento: "%20",
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
        descuento: "%15",
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
        descuento: "%30",
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
        descuento: "%10",
        foto: "/images/img-amoladora-bosch.png",
        url: "/products"
    },

];

let filtros =[
    "MARCA",
    "COLOR",
    "TAMAÑO",
    "PRECIO",
    "CON DESCUENTO"
]

const productsController = {
    herramientas: (req, res) => {
        let listaProductos = listaProducts.filter(producto=>{return producto.categoria == "herramienta"}) 
        res.render('products', {listaProductos,filtros});
    },

    pinturas: (req, res) => {
        let listaProductos = listaProducts.filter(producto=>{return producto.categoria == "pintura"}) 
        res.render('products', {listaProductos, filtros});
    },

    griferia: (req, res) => {
        let listaProductos = listaProducts.filter(producto=>{return producto.categoria == "griferia"}) 
        res.render('products', {listaProductos, filtros});
    },

    pileta: (req, res) => {
        let listaProductos = listaProducts.filter(producto=>{return producto.categoria == "pileta"}) 
        res.render('products', {listaProductos, filtros});
    },

    jardineria: (req, res) => {
        let listaProductos = listaProducts.filter(producto=>{return producto.categoria == "jardineria"}) 
        res.render('products', {listaProductos, filtros});
    },

    detalle: (req, res) =>{
        let producto = listaProducts.find(producto => producto.id == req.params.id)
        console.log(producto)
        res.render('products', {producto});
    }
}

module.exports = productsController