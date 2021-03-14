const { check } = require('express-validator');
function validateUserRegister (req, res, next) {
    let validateRegister = [
        check('usuario').notEmpty().withMessage('Debes ingresar un nombre de usuario'), 
        check('email').notEmpty().withMessage('Debes ingresar un correo').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
        check('password').notEmpty().withMessage('Debes ingresar una contraseña').bail()
        .isLength({min: 8}).withMessage('La contraseña debe tener almenos 8 caracteres'), 
        check('conf-password').notEmpty().withMessage('Debes confirmar la contraseña').bail()
        .custom((value, {req}) => {
            let ogPassword = req.body.password;
            let confPassword = req.body.confPassword;
            if(ogPassword !== confPassword){
                throw new Error('Las contraseñas deben coincidir');
            }
            return true;
        })
    ];
    next();
}
module.exports= validateUserRegister;