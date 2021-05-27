const express = require('express');
const router = express.Router();
const userAPIController = require('../../controllers/api/userAPIController');

//Ruta para obtener un objeto literal de todos los usuarios
router.get("/", userAPIController.list);

//Ruta para obtener un objeto literal de un usuario en específico
router.get("/:id", userAPIController.findUser);

module.exports = router;