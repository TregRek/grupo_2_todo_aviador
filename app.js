const express = require('express');
const app = express();
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE

var indexRouter = require('./routes/index');
var productRouter = require('./routes/producto');
const publicPath = path.resolve(__dirname, '../public');

app.use(methodOverride('_method'));
app.use(express.static(publicPath));

app.listen(3000, console.log("Server's up! Port 3000"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/producto', productRouter);