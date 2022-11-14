const path = require('path');
const index = "./src/views/home.html";
const cart = "./src/views/cart.html";
const detail = "./src/views/detail.html";
const register = "./src/views/register.html";
const login = "./src/views/login.html";

const mainController = {
    index: (req, res) => {
        res.sendFile(path.resolve(index));
    },

    home: (req, res) => {
        res.sendFile(path.resolve(index));
    },

    product: (req, res) => {
        res.sendFile(path.resolve(detail));
    },

    cart: (req, res) => {
        res.sendFile(path.resolve(cart));
    },

    register: (req, res) => {
        res.sendFile(path.resolve(register));
    },

    login: (req, res) => {
        res.sendFile(path.resolve(login));
    }

}

module.exports = mainController