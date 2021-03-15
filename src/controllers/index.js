const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
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
        if (errors.errors.length > 0) {
           return res.render('./user/login', { errors: errors.mapped(), old: req.body});
        }
        let userToLogin = User.findByField('usuario', req.body.usuario);
        if(!userToLogin){
            return res.render('./user/login', {
                errors:{ 
                    usuario: {msg: 'El usuario no se encuentra registrado'}
                }, 
                old: req.body
            });
        }
        let comparePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
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
        if (errors.errors.length > 0) {
           return res.render('./user/register', {errors: errors.mapped(), old: req.body});
        }
        let emailInDB = User.findByField('email', req.body.email);
        let userInDB = User.findByField('usuario', req.body.usuario);
        if(userInDB){
            return res.render('./user/register', { 
                errors: {
                    usuario: {msg:'El usuario ya se encuentra en uso'}
                }, 
                old: req.body
            });
        }
        if(emailInDB){
            return res.render('./user/register', { 
                errors: {
                    email: {msg:'El email ya se encuentra registrado'}
                }, 
                old: req.body
            });
        }

        let userToCreate = {
            usuario: req.body.usuario,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10)
        }
            
        User.create(userToCreate);
        return res.redirect('/login');
    },
    editPassword: (req, res) => {
        let errors = validationResult(req);
        console.log(req.body);
        if (errors.errors.length > 0) {3
            console.log(errors.mapped());
            return res.render('./user/profile', {errors: errors.mapped(), user: req.session.userLogged});
        }
        let userToEdit = User.findByField('usuario', req.session.userLogged);
        userToEdit = {
            ...req.session.userLogged,
            password: bcryptjs.hashSync(req.body.newPassword, 10)
        }
        User.edit(userToEdit);
        return res.redirect('/profile');
    },
    cart:  (req, res) =>{
        res.render('./user/productCart');
    }
};

module.exports = indexController;





