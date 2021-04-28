module.exports = (sequelize, dataTypes) => {
    let alias = "Products"
    let cols = {
        id_product: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name_product: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.STRING
        }
    }
    let config= {
        tableName: "product",
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config);
    Product.associate = (models) => {
        Product.hasMany(models.ProductEntries, { 
            as: "productEntries",
            foreignKey: "id_product"
        });
        Product.hasMany(models.ProductEntries, { 
            as: "productimages",
            foreignKey: "id_product"
        });
    }
    return Product;
}