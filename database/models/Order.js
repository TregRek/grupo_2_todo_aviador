module.exports = (sequelize, dataTypes) => {
    let alias = "Orders"
    let cols = {
        idOrder: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idCart: {
            type: dataTypes.INTEGER
        },
        idUser: {
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
        tableName: "orders"
    }

    const Order = sequelize.define(alias, cols, config);
    Order.associate = (models) => {
        Order.belongsTo(models.User, {
            as: "users",
            foreignKey: "idUser"
        });
        Order.belongsTo(models.Cart, {
            as: "carts",
            foreignKey: "idCart"
        });
    }
    return Order;
}