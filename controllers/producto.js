const productController = {
    producto: (req, res) =>{
        res.render('productDetail');
    },
    
    listado: (req, res) =>{
        res.render('register');
    }
};

module.exports = productController;