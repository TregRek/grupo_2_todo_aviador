module.exports = (sequelize, dataTypes) => {
    let alias = "Orders"
    let cols = {
        id_order: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_cart: {
            type: dataTypes.INTEGER
        },
        id_user: {
            type: dataTypes.INTEGER
        },
        payment: {
            type: dataTypes.STRING
        },
        province: {
            type: dataTypes.STRING
        },
        district: {
            type: dataTypes.STRING
        },
        address: {
            type: dataTypes.STRING
        },
        status: {
            type: dataTypes.STRING
        }
    }
    let config= {
        tableName: "order"
    }

    const Order = sequelize.define(alias, cols, config);
    Order.associate = (models) => {
        Order.belongsTo(models.Users, {
            as: "users",
            foreignKey: "id_user"
        });
        Order.belongsTo(models.Carts, {
            as: "carts",
            foreignKey: "id_cart"
        });
    }
    return Order;
}