const db = require('../../database/models');
function userLoggedMiddleware (req, res, next) {
    res.locals.isLogged = false;
    if(req.cookies.usuario){
        db.Users.findOne({
            where:  {user_name: req.cookies.usuario}
        }).then((resultado)=>{
            req.session.userLogged = resultado.dataValues;
            delete req.session.userLogged.password;
        })
    }
    if(req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    next();
}

module.exports = userLoggedMiddleware;