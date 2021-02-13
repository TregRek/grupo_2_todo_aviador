const express = require('express');
const app = express();
const path = require('path');

var indexRouter = require('./routes/index');
var productRouter = require('./routes/producto');
// const publicPath = path.resolve(__dirname, './public');

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, console.log("Server's up! Port 3000"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);

app.use('/producto', productRouter);

// carrito
// app.listen(console.log(productRouter));
// app.use('/', productRouter);
