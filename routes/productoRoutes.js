const express = require('express');
const router = express.Router();
const productController = require('../controllers/productoController');

router.get("/detalle/:idProd", productController.producto);

router.get("/lista-productos", productController.listado);

router.get("/editar/:idProd", productController.editar)

module.exports = router;