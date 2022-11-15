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
        res.render('cart');
    },

    register: (req, res) => {
        res.render('register');
    },

    login: (req, res) => {
        res.render('login');
    }
}

module.exports = mainController