const express = require('express');
const router = express.Router();
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,'../../public/images'));
    },
    filename: (req, file, cb) =>{
        const newFilename = file.originalname;
        cb(null, newFilename);
    }
});
const upload = multer({storage: storage});
const indexController = require('../controllers/index');
const { body } = require('express-validator');
let validateRegister = [
    body('usuario').notEmpty().withMessage('Debes ingresar un nombre de usuario'), 
    body('email').notEmpty().withMessage('Debes ingresar un correo').bail()
    .isEmail().withMessage('Debes ingresar un email válido'),
    body('nombres').notEmpty().withMessage('Debes ingresar tus nombres').bail()
    .isLength({ min: 2 }).withMessage('El nombre debe tener almenos 2 caracteres'),
    body('apellidos').notEmpty().withMessage('Debes ingresar tus apellidos').bail()
    .isLength({ min: 2 }).withMessage('El nombre debe tener almenos 2 caracteres'),
    body('password').notEmpty().withMessage('Debes ingresar una contraseña').bail()
    .isLength({min: 8}).withMessage('La contraseña debe tener almenos 8 caracteres').bail()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i").withMessage('La contraseña debe tener una mayuscula, una minuscula y un caracter especial'), 
    body('confPassword').notEmpty().withMessage('Debes confirmar la contraseña').bail()
    .custom((value, {req}) => {
        let ogPassword = req.body.password;
        let confPassword = req.body.confPassword;
        if(ogPassword !== confPassword){
            throw new Error('Las contraseñas deben coincidir');
        }
        return true;
    }),
    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];
        if(!file){
            throw new Error('Tienes que subir una imagen');
        }else{
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`La extensiones permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
];
let validateLogin = [
    body('usuario').notEmpty().withMessage('Debes ingresar un nombre de usuario'), 
    body('password').notEmpty().withMessage('Debes ingresar una contraseña')
];
let validateEditUser = [
    body('usuario').notEmpty().withMessage('Debes ingresar un nombre de usuario'), 
    body('email').notEmpty().withMessage('Debes ingresar un correo').bail()
    .isEmail().withMessage('Debes ingresar un email válido'),
    body('nombres').notEmpty().withMessage('Debes ingresar tus nombres'),
    body('apellidos').notEmpty().withMessage('Debes ingresar tus apellidos')
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
router.post("/login", validateLogin, indexController.processLogin);
//---------------REGISTRO DE USUARIO--------------
router.get("/register", guestMiddleware ,indexController.register);
router.post("/register", [upload.single('image'), validateRegister], indexController.processRegister);
//---------------CARRITO DE USUARIO--------------
router.get("/cart", indexController.cart);
//---------------PERFIL DE USUARIO--------------
router.get("/profile", authMiddleware, indexController.profile);
router.put("/editPassword/", validateEditPass, indexController.editPassword);
router.put("/editUser/", [upload.single('image'), validateEditUser], indexController.editUser);
//---------------LOGOUT--------------
router.get("/logout", indexController.logout);

module.exports = router;