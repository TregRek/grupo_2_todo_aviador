const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
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
let validateLogin = [
    body('usuario').notEmpty().withMessage('Debes ingresar un nombre de usuario'), 
    body('password').notEmpty().withMessage('Debes ingresar una contraseña')
];
let validateEditPass = [
    body('actPassword').notEmpty().withMessage('Debes ingresar la contraseña anterior'), 
    body('newPassword').notEmpty().withMessage('Debes ingresar una contraseña nueva').bail()
    .isLength({min: 8}).withMessage('La contraseña debe tener almenos 8 caracteres'), 
    body('confPassword').notEmpty().withMessage('Debes confirmar la contraseña').bail()
    .custom((value, {req}) => {
        if(req.body.newPassword !== req.body.confPassword){
            throw new Error('Las contraseñas deben coincidir');
        }
        return true;
    })
];

//---------------HOME--------------
router.get("/", indexController.index);
//---------------LOGIN DE USUARIO--------------
router.get("/login", guestMiddleware,indexController.login);
router.post("/login", validateLogin,indexController.processLogin);
//---------------REGISTRO DE USUARIO--------------
router.get("/register", guestMiddleware ,indexController.register);
router.post("/register", validateRegister, indexController.processRegister);
//---------------CARRITO DE USUARIO--------------
router.get("/cart", indexController.cart);
//---------------PERFIL DE USUARIO--------------
router.get("/profile", authMiddleware, indexController.profile);
router.put("/editPassword", validateEditPass, indexController.editPassword);
//---------------LOGOUT--------------
router.get("/logout", indexController.logout);

module.exports = router;