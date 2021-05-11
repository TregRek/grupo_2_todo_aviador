const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
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
const productController = require('../controllers/producto');
const { body } = require('express-validator');
let validateProduct = [
    body('name').notEmpty().withMessage('EL producto debe tener un nombre').bail()
    .isLength({min:5}).withMessage('Debe tener almenos 5 caracteres'),
    body('description').notEmpty().withMessage('EL producto debe tener una descripción').bail()
    .isLength({min:20}).withMessage('Debe tener almenos 20 caracteres'),
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
]
router.get("/detalle/:idProd", productController.producto);

router.get("/listado", productController.listado);

//---------------EDITAR PRODUCTO--------------
router.get("/editar/:idProd", productController.editar);
router.put("/editar/:idProd", [upload.single('image'), validateProduct], productController.update);

//---------------CREAR PRODUCTO--------------
router.get("/crear", productController.crear)
router.post("/crear", [upload.single('image'), validateProduct], productController.store)

//---------------ELIMINAR PRODUCTO--------------
router.delete("/eliminar/:idProd", productController.destroy)

module.exports = router;