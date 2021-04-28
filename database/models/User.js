module.exports = (sequelize, dataTypes) => {
    let alias = "Users"
    let cols = {
        id_user: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: dataTypes.STRING
        },
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        created_at: {
            type: dataTypes.DATE
        },
        updated_at: {
            type: dataTypes.DATE
        },
        status: {
            type: dataTypes.STRING
        },
        name_img: {
            type: dataTypes.STRING
        }
    }
    let config= {
        tableName: "user"
    }

    const User = sequelize.define(alias, cols, config);
    User.associate = (models) => {
        User.hasMany(models.Carts, {
            as: "carts",
            foreignKey: "id_user"
        });
        User.hasMany(models.Orders, {
            as: "orders",
            foreignKey: "id_user"
        });
    }
    return User;
}