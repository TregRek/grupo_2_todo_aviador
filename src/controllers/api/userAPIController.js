const db = require('../../../database/models');
const Users = db.Users;

const userAPIController = {
    'list': (req, res) => {
        Users.findAll()
        .then(users => {
            let userPush;
            let usersArray = [];
            users.forEach(user => {
                userPush = {
                id: user.id_user,
                name: user.first_name + " " + user.last_name,
                email: user.email,
                detail: '/api/users/' + user.id_user
                };
                usersArray.push(userPush);
            })
            let respuesta = {
                count: users.length,
                users: usersArray
            };
            res.json(respuesta);
        })
    },
    'findUser': async (req, res) => {
        const userSearch = await Users.findByPk(req.params.id);
        let userFound;
        if(userSearch === null){
            return res.json("not found");
        } else {
            userFound = userSearch.dataValues;
            delete userFound.password;
            userFound.urlImage = '/images/' + userSearch.name_img; 
            return res.json(userFound);
        }
    }
}

module.exports = userAPIController;
