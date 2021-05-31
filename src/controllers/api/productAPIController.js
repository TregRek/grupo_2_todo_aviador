const db = require('../../../database/models');
const Products = db.Products;
const ProductEntries = db.ProductEntries;
const Categories = db.Categories;
const { QueryTypes } = require('sequelize');

const productAPIController = {
    'list': async (req, res) => {
        let productsProm = await Products.findAll();
        let prodEntryProm = await ProductEntries.findAll({
            include: [{model: db.Categories, as:'categories', atributes:['name_category']}]
        });
        let countByCategory = await db.sequelize.query("SELECT category.name_category, count(product.id_product) as cantidad from product left join product_entry on product.id_product = product_entry.id_product left join category on product_entry.id_category = category.id_category group by category.name_category;", { type: QueryTypes.SELECT });
        
        let objetoCategorias = {};

        countByCategory.forEach(category => {
            objetoCategorias = { 
                ...objetoCategorias,
                [category.name_category] : category.cantidad
            }
        });

        let productPush;
        let productsArray = [];
        productsProm.forEach(product => {
            let categorias = []
            prodEntryProm.forEach(product_entry => {
                if(product.id_product === product_entry.id_product) {
                    categorias.push(product_entry.categories.name_category);
                }
            })
            productPush = {
            id: product.id_product,
            name: product.name_product,
            description: product.description,
            categories: categorias,
            detail: '/api/products/' + product.id_product
            };
            productsArray.push(productPush);
        })

        let respuesta = {
            count: productsArray.length,
            countByCategory: objetoCategorias,
            products: productsArray
        };
        return res.json(respuesta);
    },
    'findProduct': async (req, res) => {
        let productSearch = await Products.findByPk(req.params.id, 
            {include:[
                {model: db.ProductImages, as:'productimages', atributes:['id_image', 'id_product'],
                    include:[
                        {model: db.Images, as:'images', atributes:['name_img']}
                    ]}
                ]});
        let prodEntryProm = await ProductEntries.findAll(
            {where: {id_product: req.params.id},
            include : [{model: db.Categories, as:'categories', atributes:['name_category']},
                    {model: db.Sizes, as:'sizes', atributes: ['size']},
                    {model: db.Brands, as:'brands', atributes: ['name_brand']},
                    {model: db.Colors, as:'colors', atributes: ['color']}]
        });
        let categorias = [];
        let colores = [];
        let marcas = [];
        let tallas = [];
        prodEntryProm.forEach(product_entry => {
            categorias.push(product_entry.categories.name_category);
            colores.push(product_entry.colors.color);
            marcas.push(product_entry.brands.name_brand);
            tallas.push(product_entry.sizes.size);
            console.log(product_entry);
        })
        let productFound;
        if(productSearch === null){
            return res.json("not found");
        } else {
            productFound = productSearch.dataValues;
            delete productFound.productimages;
            productFound.categories = categorias;
            productFound.colors = colores;
            productFound.brands = marcas;
            productFound.sizes = tallas;
            productFound.price = prodEntryProm[0].price;
            productFound.stock = prodEntryProm[0].stock;
            productFound.urlImage = 'http://localhost:3000/images/' + productSearch.productimages[0].images.name_img;
            return res.json(productFound);
        }
    }
}

module.exports = productAPIController;
