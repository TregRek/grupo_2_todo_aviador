const db = require('../../database/models');

async function error404Middleware (req,res,next) {
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
	res.status(404).render('./user/404', {fProducts:fProducts});
    }

    module.exports = error404Middleware;