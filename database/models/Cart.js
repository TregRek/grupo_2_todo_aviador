module.exports = (sequelize, dataTypes) => {
    let alias = "Carts"
    let cols = {
        id_cart: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: {
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
        tableName: "cart"
    }

    const Cart = sequelize.define(alias, cols, config);
    Cart.associate = (models) => {
        Cart.belongsTo(models.Users, {
            as: "users",
            foreignKey: "id_user"
        });
        Cart.belongsTo(models.Orders, {
            as: "orders",
            foreignKey: "id_cart"
        });
        Cart.hasMany(models.CartProds, {
            as: "cartProds",
            foreignKey: "id_cart"
        });
    }
    return Cart;
}