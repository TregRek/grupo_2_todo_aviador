const db = require('../../database/models');
const { validationResult } = require('express-validator');
const productController = {
    producto: async (req, res) =>{

        let fProducts;
         await db.Products.findAll({
            order:[
                ['id_product', 'DESC']
            ],
            limit: 3,
            include: [{association: "productEntries", include:[{association: "categories"}]}, 
                    {association: "productimages", include:[{association: "images"}]}]
        }).then((results)=>{
            fProducts = results;
        })

        let product;
        await db.ProductEntries.findAll({
            where: {id_product: req.params.idProd},
            include:[
                {model: db.Categories, as:'categories', atributes:['name_category']}, 
                {model: db.Sizes, as:'sizes', atributes: ['size']},
                {model: db.Brands, as:'brands', atributes: ['name_brand']},
                {model: db.Colors, as:'colors', atributes: ['color']},
                {model: db.Products, as:'products', atributes: ['name_product', 'description'], 
                include:[{model: db.ProductImages, as:'productimages', atributes:['id_image', 'id_product'],
                include:[{model: db.Images, as:'images', atributes:['name_img']}]}]}
            ] 
        }).then((resultado)=>{
            let prod_img = resultado[0].products.productimages;
            product = {
                name_product: resultado[0].products.name_product,
                description: resultado[0].products.description,
                category: resultado[0].categories.name_category,
                color: resultado[0].colors.color,
                size: resultado[0].sizes.size,
                brand: resultado[0].brands.name_brand,
                image: prod_img[0].images.name_img,
                price: resultado[0].price,
                stock: resultado[0].stock,
                id_product: resultado[0].id_product
            };
           
        })
        return res.render('./products/productDetail', {product: product, fProducts:fProducts});
    },
    
    listado: async (req, res) =>{
        let fProducts;
         await db.Products.findAll({
            order:[
                ['id_product', 'DESC']
            ],
            limit: 3,
            include: [{association: "productEntries", include:[{association: "categories"}]}, 
                    {association: "productimages", include:[{association: "images"}]}]
        }).then((results)=>{
            fProducts = results;
        })
        let product;
        await db.Products.findAll({
            include: [{association: "productEntries", include:[{association: "categories"}]}, 
                    {association: "productimages", include:[{association: "images"}]}]
        }).then((results)=>{
            product = results;
        })
        return res.render('./products/productList', {product: product, fProducts:fProducts});
    },

    editar: async (req, res) =>{
        let allCategories = await db.Categories.findAll();;
        let allColors = await db.Colors.findAll();
        let allSizes = await db.Sizes.findAll();
        let allBrands = await db.Brands.findAll();
        let productoEditar = await db.Products.findOne({
            where: {id_product: req.params.idProd},
            include: [{association:"productEntries"}, {association:"productimages", include:[{association: "images"}]}]
        });
        let fProducts;
         await db.Products.findAll({
            order:[
                ['id_product', 'DESC']
            ],
            limit: 3,
            include: [{association: "productEntries", include:[{association: "categories"}]}, 
                    {association: "productimages", include:[{association: "images"}]}]
        }).then((results)=>{
            fProducts = results;
        })
        
        return res.render('./products/editProduct', {product: productoEditar, categories:allCategories, brands:allBrands, sizes:allSizes, colors:allColors, fProducts: fProducts});
    },

    update: async (req, res) => {
        let errors = validationResult(req);
        console.log(errors);
        if(errors.length>0){
            let allCategories = await db.Categories.findAll();;
            let allColors = await db.Colors.findAll();
            let allSizes = await db.Sizes.findAll();
            let allBrands = await db.Brands.findAll();
            let productoEditar = await db.Products.findOne({
                where: {id_product: req.params.idProd},
                include: [{association:"productEntries"}, {association:"productimages", include:[{association: "images"}]}]
            });
            return res.render('./products/editProduct', {product: productoEditar, categories:allCategories, brands:allBrands, sizes:allSizes, colors:allColors, errors: errors.mapped()});
        }
        await db.Products.update({
            name_product: req.body.name,
            description: req.body.description
        },{
            where: {id_product: req.params.idProd}
        });
        await db.ProductEntries.update({
            id_category: req.body.category,
            id_size: req.body.size,
            id_color: req.body.color,
            id_brand: req.body.brand,
            price: req.body.price,
            stock: req.body.stock
        },{
            where: {id_product: req.params.idProd}
        });
        if (req.file) {
            let img = await db.Images.create({
                name_img: req.file.originalname
            });
            await db.ProductImages.update({
                id_image: img.id_image
            },{
                where:{id_product: req.params.idProd}
            });
        }
		let redirec = '/producto/detalle/' + req.params.idProd;
		res.redirect(redirec);
    },

    crear: async (req, res) => {
        let allCategories = await db.Categories.findAll();
        let allColors = await db.Colors.findAll();
        let allSizes = await db.Sizes.findAll();
        let allBrands = await db.Brands.findAll();
        let fProducts;
         await db.Products.findAll({
            order:[
                ['id_product', 'DESC']
            ],
            limit: 3,
            include: [{association: "productEntries", include:[{association: "categories"}]}, 
                    {association: "productimages", include:[{association: "images"}]}]
        }).then((results)=>{
            fProducts = results;
        })
        res.render('./products/createProduct', {categories:allCategories, brands:allBrands, sizes:allSizes, colors:allColors, fProducts:fProducts});
    },

    store: async (req, res) => {
        let errors = validationResult(req);
        if(errors.length>0){
            let allCategories = await db.Categories.findAll();
            let allColors = await db.Colors.findAll();
            let allSizes = await db.Sizes.findAll();
            let allBrands = await db.Brands.findAll();
            return res.render('./products/createProduct', { errors: errors.mapped(), old: req.body, categories:allCategories, brands:allBrands, sizes:allSizes, colors:allColors});
        }
        let productCreated = await db.Products.create({
            name_product: req.body.name,
            description: req.body.description
        });
        await db.ProductEntries.create({
            id_product: productCreated.id_product,
            id_category: req.body.category,
            id_size: req.body.size,
            id_color: req.body.color,
            id_brand: req.body.brand,
            price: req.body.price,
            stock: req.body.stock
        });
        if (req.file) {
            let img = await db.Images.create({
                name_img: req.file.originalname
            });
            await db.ProductImages.create({
                id_image: img.id_image,
                id_product: productCreated.id_product
            });
        } else {
            let defaultImg = await db.Images.findOne({
                where: {name_img:"Defecto"}
            }); 
            await db.ProductImages.create({
                id_image: defaultImg.id_image,
                id_product: productCreated.id_product
            });
        }
        let redirec = '/producto/listado';
		res.redirect(redirec);
    },

    destroy : async (req, res) => {
        await db.ProductEntries.destroy({
            where:{id_product: req.params.idProd}
        });
        await db.ProductImages.destroy({
            where:{id_product: req.params.idProd}
        });
        await db.Products.destroy({
            where: {id_product: req.params.idProd}
        });
		let redirec = '/producto/listado';
		res.redirect(redirec);
	}
};

module.exports = productController;