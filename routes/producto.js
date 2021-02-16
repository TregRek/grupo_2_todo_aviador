const express = require('express');
const router = express.Router();
const productController = require('../controllers/producto');

router.get("/detalle/:idProd", productController.producto);

router.get("/listado", productController.listado);

router.get("/editar/:idProd", productController.editar)

module.exports = router;