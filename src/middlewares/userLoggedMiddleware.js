const User = require('../models/User');
function userLoggedMiddleware (req, res, next) {
    res.locals.isLogged = false;
    if(req.cookies.usuario){
        req.session.userLogged = User.findByField('usuario', req.cookies.usuario);
    }
    if(req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    next();
}

module.exports = userLoggedMiddleware;