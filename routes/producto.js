const express = require('express');
const router = express.Router();
const productController = require('../controllers/producto');

router.get("/producto-detalle", productController.producto);

router.get("/lista-productos", productController.listado);

module.exports = router;