const express = require('express');
const app = express();
const path = require('path');
// const publicPath = path.resolve(__dirname, './public');

app.use( '/static', express.static(__dirname + '/public'));

app.listen(3000, console.log("Escuchando en el puerto 3000"));

app.get("/home", (req, res) =>{
    res.sendFile(path.resolve(__dirname, './views/index.html'));
});

app.get("/login", (req, res) =>{
    res.sendFile(path.resolve(__dirname, './views/login.html'));
});

app.get("/productDetail", (req, res) =>{
    res.sendFile(path.resolve(__dirname, './views/productDetail.html'));
});

app.get("/productCart", (req, res) =>{
    res.sendFile(path.resolve(__dirname, './views/productCart.html'));
});

app.get("/productDet", (req, res) =>{
    res.sendFile(path.resolve(__dirname, './views/productDetail.html'));
});

app.get("/register", (req, res) =>{
    res.sendFile(path.resolve(__dirname, './views/register.html'));
})
