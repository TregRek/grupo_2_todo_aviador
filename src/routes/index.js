const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');
const { body } = require('express-validator');
let validateRegister = [
    body('usuario').notEmpty().withMessage('Debes ingresar un nombre de usuario'), 
    body('email').notEmpty().withMessage('Debes ingresar un correo').bail()
    .isEmail().withMessage('Debes ingresar un email válido'),
    body('password').notEmpty().withMessage('Debes ingresar una contraseña').bail()
    .isLength({min: 8}).withMessage('La contraseña debe tener almenos 8 caracteres'), 
    body('confPassword').notEmpty().withMessage('Debes confirmar la contraseña').bail()
    .custom((value, {req}) => {
        let ogPassword = req.body.password;
        let confPassword = req.body.confPassword;
        if(ogPassword !== confPassword){
            throw new Error('Las contraseñas deben coincidir');
        }
        return true;
    })
];

router.get("/", indexController.index);

router.get("/login", indexController.login);

router.get("/register", indexController.register);
router.post("/register", validateRegister, indexController.processRegister);

router.get("/cart", indexController.cart);

module.exports = router;