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

router.get("/detalle/:idProd", productController.producto);

router.get("/listado", productController.listado);

//---------------EDITAR PRODUCTO--------------
router.get("/editar/:idProd", productController.editar);
router.put("/editar/:idProd", upload.single('image'), productController.update);

//---------------CREAR PRODUCTO--------------
router.get("/crear", productController.crear)
router.post("/crear", upload.single('image'), productController.store)

//---------------ELIMINAR PRODUCTO--------------
router.delete("/eliminar/:idProd", productController.destroy)

module.exports = router;