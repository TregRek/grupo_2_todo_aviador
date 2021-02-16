const express = require('express');
const router = express.Router();
const indexController = require('../controllers');

router.get("/", indexController.index);

router.get("/login", indexController.login);

router.get("/register", indexController.register);

router.get("/cart", indexController.cart);

module.exports = router;