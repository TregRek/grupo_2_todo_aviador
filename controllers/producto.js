const productController = {
    producto: (req, res) =>{
        res.render('productDetail');
    },
    cart:  (req, res) =>{
        res.render('productCart');
    },
    listado: (req, res) =>{
        res.render('register');
    }
};

module.exports = productController;