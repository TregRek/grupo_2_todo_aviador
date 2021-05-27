const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const db = require('../../database/models');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const { validationResult } = require('express-validator');
const indexController = {
    index: (req, res) =>{
        res.render('./user/index', {productos: products});
    },
    login: (req, res) =>{
        return res.render('./user/login');
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
    profile: (req, res) => {
        return res.render('./user/profile', {user: req.session.userLogged});
    },
    logout: (req, res) => {
        res.clearCookie('usuario');
        req.session.destroy();
        return res.redirect('/');
    },
    register: (req, res) =>{
        res.render('./user/register');
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
    cart:  (req, res) =>{
        res.render('./user/productCart');
    }
};

module.exports = indexController;





