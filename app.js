const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const cookies = require('cookie-parser');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');
const error404 = require('./src/middlewares/error404');
//Aqui llamamos al router de las páginas de usuarios
var indexRouter = require('./src/routes/index');
//Aqui llamamos al router de las páginas de productos
var productRouter = require('./src/routes/producto');
//Aqui llamamos al router del API de Usuarios
const apiUsersRouter = require('./src/routes/api/users');
const apiProductsRouter = require('./src/routes/api/products');
const publicPath = path.resolve(__dirname, './public');

app.use(session({secret:'Secreto Aereo', resave: false, saveUninitialized:false}));
app.use(cookies());
app.use(userLoggedMiddleware);

app.use(methodOverride('_method'));
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));


app.listen(3001, console.log("Server's up! Port 3001"));
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/producto', productRouter);
app.use('/api/users', apiUsersRouter);
app.use('/api/products', apiProductsRouter);
app.use(error404);