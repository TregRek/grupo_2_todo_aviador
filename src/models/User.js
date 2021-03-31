const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const User = {
    getData: function (){
        return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    },
    generateId: function () {
        let allUsers = this.findAll();
        let lastId=0;
        if(!allUsers){
            return lastId + 1;
        } else {
            for (let i=0; i<allUsers.length; i++){
                if(allUsers[i].id > lastId){
                    lastId = allUsers[i].id;
                }
            }
            return lastId + 1;
        }
    }, 
    findAll: function() {
        return this.getData();
    },
    findByPk: function (id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound;
    },
    findByField: function (field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    },
    create: function (userData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        };
        allUsers.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(allUsers, null, ' '));
        return true;
    },
    edit: function (userData) {
        let allUsers = this.findAll();
        let identifier = 0;
        for(let i=0; i<allUsers.length; i++){
            if(allUsers[i].id == userData.id){
                identifier = i;
            }
        }
        allUsers[identifier] = userData;
        fs.writeFileSync(usersFilePath, JSON.stringify(allUsers, null, ' '));
        return true;
    },
    delete: function(id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(usersFilePath, JSON.stringify(finalUsers, null, ' '));
        return true;
    }
}

module.exports = User;