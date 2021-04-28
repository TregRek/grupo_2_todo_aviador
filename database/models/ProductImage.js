module.exports = (sequelize, dataTypes) => {
    let alias = "ProductImages"
    let cols = {
        id_prod_image: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_Image: {
            type: dataTypes.INTEGER
        },
        id_product: {
            type: dataTypes.INTEGER
        }
    }
    let config= {
        tableName: "prod_image",
        timestamps: false
    }

    const ProductImage = sequelize.define(alias, cols, config);
    ProductImage.associate = (models) => {
        ProductImage.belongsTo(models.Images, {
            as: "images",
            foreignKey: "id_image"
        });
        ProductImage.belongsTo(models.Products, {
            as: "products",
            foreignKey: "id_product"
        });
    }
    return ProductImage;
}