module.exports = (sequelize, dataTypes) => {
    let alias = "Users"
    let cols = {
        idUser: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: dataTypes.STRING
        },
        firstName: {
            type: dataTypes.STRING
        },
        lastName: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        createdAt: {
            type: dataTypes.DATE
        },
        updateddAt: {
            type: dataTypes.DATE
        },
        status: {
            type: dataTypes.STRING
        },
        nameImg: {
            type: dataTypes.STRING
        }
    }
    let config= {
        tableName: "users"
    }

    const User = sequelize.define(alias, cols, config);
    User.associate = (models) => {
        User.hasMany(models.Cart, {
            as: "carts",
            foreignKey: "idUser"
        });
        User.hasMany(models.Order, {
            as: "orders",
            foreignKey: "idUser"
        });
    }
    return User;
}