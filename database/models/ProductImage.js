module.exports = (sequelize, dataTypes) => {
    let alias = "ProductImages"
    let cols = {
        idProdImg: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idImg: {
            type: dataTypes.INTEGER
        },
        idProduct: {
            type: dataTypes.INTEGER
        }
    }
    let config= {
        tableName: "productimages",
        timestamps: false
    }

    const ProductImage = sequelize.define(alias, cols, config);
    ProductImage.associate = (models) => {
        ProductImage.belongsTo(models.Image, {
            as: "images",
            foreignKey: "idImg"
        });
        ProductImage.belongsTo(models.Product, {
            as: "products",
            foreignKey: "idProducts"
        });
    }
    return ProductImage;
}