const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const productController = {
    producto: (req, res) =>{
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
        res.render('./products/productList', {producto: products});
    },

    editar: (req, res) =>{
        let filtro = products.filter(producto => (producto.id == req.params.idProd));
        let prod = filtro[0];
        res.render('./products/editProduct', {product: prod});
    },

    update: (req, res) => {
        let prodPreEdit = products.filter(product => (product.id == req.params.idProd))[0];
        let prodEdit = {};
        if(req.file){
			prodEdit = {
				id: req.params.idProd,
				name: req.body.name,
                price: req.body.price,
                category: req.body.category,
				description: req.body.description,
				image: req.file.originalname,
                variations: prodPreEdit.variations,
                tags: prodPreEdit.tags,
                galImgs:[], 
                prodsRel: prodPreEdit.prodsRel
			};
		} else {
			prodEdit = {
				id: req.params.idProd,
				name: req.body.name,
                price: req.body.price,
                category: req.body.category,
				description: req.body.description,
				image: prodPreEdit.image,
                variations: prodPreEdit.variations,
                tags: prodPreEdit.tags,
                galImgs:[], 
                prodsRel: prodPreEdit.prodsRel
			};
		}
        products = products.filter(product => (product.id != req.params.idProd));
		products.push(prodEdit);
        fs.writeFileSync(productsFilePath, JSON.stringify(products));
		let redirec = '/producto/detalle/' + prodEdit.id;
		res.redirect(redirec);
    },

    crear: (req, res) => {
        res.render('./products/createProduct');
    },

    store: (req, res) => {
        let idMax = 0;
		let newProd = {};
		for(let i = 0; i< products.length; i++) {
			if(products[i].id > idMax){
				idMax = products[i].id;
			}
		}
        if(req.file){
			newProd = {
				id: (idMax+1),
				name: req.body.name,
                price: req.body.price,
                category: [],
				description: req.body.description,
				image: req.file.originalname,
                variations: [],
                tags: [],
                galImgs:[], 
                prodsRel: []
			};
		} else {
			newProd = {
				id: (idMax+1),
				name: req.body.name,
                price: req.body.price,
                category: [],
				description: req.body.description,
				image: "Defecto.jpg",
                variations: [],
                tags: [],
                galImgs:[], 
                prodsRel: []
			};
		}
        products.push(newProd);
		fs.writeFileSync(productsFilePath, JSON.stringify(products));
        let redirec = '/producto/listado';
		res.redirect(redirec);
    },

    destroy : (req, res) => {
		products = products.filter(product => (product.id != req.params.idProd));
		fs.writeFileSync(productsFilePath, JSON.stringify(products));
		let redirec = '/producto/listado';
		res.redirect(redirec);
	}
};

module.exports = productController;