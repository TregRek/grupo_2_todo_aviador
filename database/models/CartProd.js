module.exports = (sequelize, dataTypes) => {
    let alias = "CartProds"
    let cols = {
        id_cart_prod: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_cart: {
            type: dataTypes.INTEGER
        },
        id_product_entry: {
            type: dataTypes.INTEGER
        },
        amount: {
            type: dataTypes.INTEGER
        }
    }
    let config= {
        tableName: "cart_prod"
    }

    const CartProd = sequelize.define(alias, cols, config);
    CartProd.associate = (models) => {
        CartProd.belongsTo(models.Carts, {
            as: "carts",
            foreignKey: "id_cart"
        });
        CartProd.belongsTo(models.ProductEntries, {
            as: "productEntries",
            foreignKey: "id_product_entry"
        });
    }
    return CartProd;
}