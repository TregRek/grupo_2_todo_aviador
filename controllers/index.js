const indexController = {
    index: (req, res) =>{
        res.render('index');
    },
    login: (req, res) =>{
        res.render('login');
    },
    register: (req, res) =>{
        res.render('register');
    },
    cart:  (req, res) =>{
        res.render('productCart');
    }
};

module.exports = indexController;





