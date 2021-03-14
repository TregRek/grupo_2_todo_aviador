const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const { validationResult } = require('express-validator');
const indexController = {
    index: (req, res) =>{
        res.render('./user/index', {productos: products});
    },
    login: (req, res) =>{
        res.render('./user/login');
    },
    register: (req, res) =>{
        res.render('./user/register');
    },
    processRegister: (req, res) => {
        let errors = validationResult(req);
        console.log(errors.mapped());
        if (errors.isEmpty()) {
            res.send('Gracias por registrarte.');
        } else {
            res.render('./user/register', { errors: errors.mapped()});
        }
        
    },
    cart:  (req, res) =>{
        res.render('./user/productCart');
    }
};

module.exports = indexController;





