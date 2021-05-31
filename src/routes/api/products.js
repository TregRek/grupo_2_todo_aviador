const express = require('express');
const router = express.Router();
const productAPIController = require('../../controllers/api/productAPIController');

//Ruta para obtener un objeto literal de todos los usuarios
router.get("/", productAPIController.list);

//Ruta para obtener un objeto literal de un usuario en específico
router.get("/:id", productAPIController.findProduct);

module.exports = router;