module.exports = (sequelize, dataTypes) => {
    let alias = "Carts"
    let cols = {
        idCart: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUser: {
            type: dataTypes.INTEGER
        },
        date: {
            type: dataTypes.DATE
        },
        total: {
            type: dataTypes.FLOAT
        },
        status: {
            type: dataTypes.STRING
        }
    }
    let config= {
        tableName: "carts"
    }

    const Cart = sequelize.define(alias, cols, config);
    Cart.associate = (models) => {
        Cart.belongsTo(models.User, {
            as: "users",
            foreignKey: "idUser"
        });
        Cart.belongsTo(models.Order, {
            as: "orders",
            foreignKey: "idCart"
        });
        Cart.hasMany(models.CartProd, {
            as: "cartProds",
            foreignKey: "idCart"
        });
    }
    return Cart;
}