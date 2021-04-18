module.exports = (sequelize, dataTypes) => {
    let alias = "Products"
    let cols = {
        idProduct: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        }
    }
    let config= {
        tableName: "products",
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config);
    Product.associate = (models) => {
        Product.hasMany(models.ProductEntry, { 
            as: "productEntries",
            foreignKey: "idProduct"
        });
        Product.hasMany(models.ProductEntry, { 
            as: "productimages",
            foreignKey: "idProduct"
        });
    }
    return Product;
}