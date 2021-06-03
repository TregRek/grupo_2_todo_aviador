const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const db = require('../../database/models');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const { validationResult } = require('express-validator');
const indexController = {
    index: async (req, res) =>{
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
        res.render('./user/index', {productos: products, fProducts:fProducts});
    },
    login: async (req, res) =>{
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
        return res.render('./user/login', {fProducts:fProducts});
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);
        console.log(errors.length);
        if (errors.errors.length > 0) {
           return res.render('./user/login', { errors: errors.mapped(), old: req.body});
        }
        let userToLogin;
        db.Users.findOne({
            where:  {user_name: req.body.usuario}
        }).then((resultado)=>{
            if(!resultado){
                return res.render('./user/login', {
                    errors:{ 
                        usuario: {msg: 'El usuario no se encuentra registrado'}
                    }, 
                    old: req.body
                });
            }else {
                userToLogin = resultado.dataValues;
            }
            let comparePassword = bcryptjs.compareSync(req.body.password ,userToLogin.password);
            if(!comparePassword){
                return res.render('./user/login', {
                    errors:{ 
                        usuario: {msg: 'Las credenciales son incorrectas'}
                    }, 
                    old: req.body
                });
            }
            delete userToLogin.password;
            req.session.userLogged = userToLogin;
            if(req.body.recordarme){
                res.cookie('usuario', req.body.usuario, {maxAge: 1000*60*5});
            }
            return res.redirect('/profile');
        });
        
    },
    profile: async (req, res) => {
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
        return res.render('./user/profile', {user: req.session.userLogged, fProducts:fProducts});
    },
    logout: (req, res) => {
        res.clearCookie('usuario');
        req.session.destroy();
        return res.redirect('/');
    },
    register: async (req, res) =>{
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
        res.render('./user/register', {fProducts:fProducts});
    },
    processRegister: (req, res) => {
        let errors = validationResult(req);
        if (errors.length > 0) {
            return res.render('./user/register', {errors: errors.mapped(), old: req.body});
        }
        let userInDB = db.Users.findOne({
            where:  {user_name: req.body.usuario}
        });
        let emailInDB = db.Users.findOne({
            where:  {email: req.body.email}
        });
        
        Promise.all([userInDB, emailInDB])
            .then((values)=>{
                if(values[0]){
                    return res.render('./user/register', { 
                        errors: {
                            usuario: {msg:'El usuario ya se encuentra en uso'}
                        }, 
                        old: req.body
                    });
                }
                if(values[1]){
                    return res.render('./user/register', { 
                        errors: {
                            email: {msg:'El email ya se encuentra registrado'}
                        }, 
                        old: req.body
                    });
                }
                let userToCreate;
                if(req.file){
                    userToCreate = {
                        user_name: req.body.usuario,
                        first_name: req.body.nombres,
                        last_name: req.body.apellidos,
                        email: req.body.email,
                        name_img: req.file.originalname,
                        password: bcryptjs.hashSync(req.body.password, 10),
                        status: 1,
                    };
                } else {
                    userToCreate = {
                        user_name: req.body.usuario,
                        first_name: req.body.nombres,
                        last_name: req.body.apellidos,
                        email: req.body.email,
                        name_img: "default-user.png",
                        password: bcryptjs.hashSync(req.body.password, 10),
                        status: 1,
                    };
                }
                db.Users.create(userToCreate);
                delete userToCreate.password;
                req.session.userLogged = userToCreate;   
                return res.redirect('/profile');
            });
    },
    editPassword: (req, res) => {
        let errors = validationResult(req);
        if (errors.length > 0) {
            return res.render('./user/profile', {errors: errors.mapped(), user: req.session.userLogged});
        }
        db.Users.update({
            password: bcryptjs.hashSync(req.body.newPassword, 10)
        },{
            where: {id_user: req.session.userLogged.id_user}
        }).then(()=>{
            return res.redirect('/profile');
        })
    },
    editUser: (req, res) => {
        let errors = validationResult(req);
        if (errors.length > 0) {
            return res.render('./user/profile', {errors: errors.mapped(), user: req.session.userLogged});
        }
        let userInDB = db.Users.findOne({
            where:  {user_name: req.body.usuario}
        });
        let emailInDB = db.Users.findOne({
            where:  {email: req.body.email}
        });
        Promise.all([userInDB, emailInDB])
        .then((values)=>{
            if(values[0] && values[0].dataValues.user_name!=req.session.userLogged.user_name){
                return res.render('./user/profile', { 
                    errors: {
                        usuario: {msg:'El usuario ya se encuentra en uso'}
                    },
                    user: req.session.userLogged
                });
            }
            if(values[1] && values[1].dataValues.email!=req.session.userLogged.email){
                return res.render('./user/profile', { 
                    errors: {
                        email: {msg:'El email ya se encuentra registrado'}
                    },
                    user: req.session.userLogged
                });
            }    
            if(req.file){
                db.Users.update({
                    user_name: req.body.usuario,
                    email: req.body.email,
                    first_name: req.body.nombres,
                    last_name: req.body.apellidos,
                    image: req.file.originalname
                }, {
                    where: {id_user:req.session.userLogged.id_user}
                }).then(()=>{
                    let userToEdit;
                    db.Users.findOne({
                        where:  {user_name: req.body.usuario}
                    }).then((resultado)=>{
                        userToEdit = resultado.dataValues;
                        delete userToEdit.password;
                        req.session.userLogged = userToEdit;
                        if(req.cookies.usuario){
                            res.clearCookie('usuario');
                            res.cookie('usuario', userToEdit.user_name, {maxAge: 1000*60*5});
                        }
                        return res.redirect('/profile');
                    })
                })
            } else {
                db.Users.update({
                    user_name: req.body.usuario,
                    email: req.body.email,
                    first_name: req.body.nombres,
                    last_name: req.body.apellidos,
                }, {
                    where: {id_user:req.session.userLogged.id_user}
                }).then(()=>{
                    let userToEdit;
                    db.Users.findOne({
                        where:  {user_name: req.body.usuario}
                    }).then((resultado)=>{
                        userToEdit = resultado.dataValues;
                        delete userToEdit.password;
                        req.session.userLogged = userToEdit;
                        if(req.cookies.usuario){
                            res.clearCookie('usuario');
                            res.cookie('usuario', userToEdit.user_name, {maxAge: 1000*60*5});
                        }
                        return res.redirect('/profile');
                    })
                })
            }
        })
    },
    cart: async (req, res) =>{

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
            order:[
                ['id_product', 'DESC']
            ],
            limit: 2,
            include: [{association: "productEntries", include:[{association: "categories"}]}, 
                    {association: "productimages", include:[{association: "images"}]}]
        }).then((results)=>{
            product = results;
        })

        let allProduct;
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
        })
        .then((resultado)=>{
            let prod_img = resultado[0].products.productimages;
            allProduct = {
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
        return res.render('./user/productCart', {product: product, allProduct: allProduct, fProducts:fProducts});

    },
};

module.exports = indexController;





