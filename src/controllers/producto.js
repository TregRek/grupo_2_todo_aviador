const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const productController = {
    producto: (req, res) =>{
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let filtro = products.filter(product => (product.id == req.params.idProd));
        let prod = filtro[0];
        let productsRel = [];
        for (let i = 0; i < prod.prodsRel.length; i++) {
            for(let j = 0; j < products.length; j++) {
                if(products[j].id == prod.prodsRel[i]) {
                    productsRel.push(products[j]);
                }
            }
        }
        res.render('./products/productDetail', {product: prod, productsRel: productsRel});
    },
    
    listado: (req, res) =>{
        res.render('productList');
    },

    editar: (req, res) =>{
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let filtro = products.filter(producto => (producto.id == req.params.idProd));
        let prod = filtro[0];
        res.render('./products/editProduct', {product: prod});
    },
};

module.exports = productController;