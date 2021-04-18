module.exports = (sequelize, dataTypes) => {
    let alias = "CartProds"
    let cols = {
        idCartProd: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idCart: {
            type: dataTypes.INTEGER
        },
        idProdEntry: {
            type: dataTypes.INTEGER
        },
        amount: {
            type: dataTypes.INTEGER
        }
    }
    let config= {
        tableName: "cartprods"
    }

    const CartProd = sequelize.define(alias, cols, config);
    CartProd.associate = (models) => {
        CartProd.belongsTo(models.Cart, {
            as: "carts",
            foreignKey: "idCart"
        });
        CartProd.belongsTo(models.ProductEntry, {
            as: "productEntries",
            foreignKey: "idProdEntry"
        });
    }
    return CartProd;
}