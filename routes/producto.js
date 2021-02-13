const express = require('express');
const router = express.Router();
const productController = require('../controllers/producto');

router.get("/", productController.producto);

router.get("/productos/listado", productController.listado);

module.exports = router;