const path = require('path');
const index = "./src/views/home.ejs";
const cart = "./src/views/cart.ejs";
const detail = "./src/views/detail.ejs";
const register = "./src/views/register.ejs";
const login = "./src/views/login.ejs";

const mainController = {
    index: (req, res) => {
        res.render(path.resolve(index));
    },

    home: (req, res) => {
        res.render(path.resolve(index));
    },

    product: (req, res) => {
        res.render(path.resolve(detail));
    },

    cart: (req, res) => {
        res.render(path.resolve(cart));
    },

    register: (req, res) => {
        res.render(path.resolve(register));
    },

    login: (req, res) => {
        res.render(path.resolve(login));
    }
}

module.exports = mainController