module.exports = (sequelize, dataTypes) => {
    let alias = "ProductEntries"
    let cols = {
        id_product_entry: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_product:{
            type: dataTypes.INTEGER
        },
        id_color: {
            type: dataTypes.INTEGER
        },
        id_category: {
            type: dataTypes.INTEGER
        },
        id_size: {
            type: dataTypes.INTEGER
        },
        id_brand: {
            type: dataTypes.INTEGER
        },
        price: {
            type: dataTypes.FLOAT
        },
        stock: {
            type: dataTypes.INTEGER
        },
        status: {
            type: dataTypes.STRING
        }
    }
    let config= {
        tableName: "product_entry",
        timestamps: false
    }

    const ProductEntry = sequelize.define(alias, cols, config);
    ProductEntry.associate = (models) => {
        ProductEntry.hasMany(models.CartProds, {
            as: "cartProducts",
            foreignKey: "id_product_entry"
        });
        ProductEntry.belongsTo(models.Products, {
            as: "products",
            foreignKey: "id_product"
        });
        ProductEntry.belongsTo(models.Sizes, {
            as: "sizes",
            foreignKey: "id_size"
        });
        ProductEntry.belongsTo(models.Categories, {
            as: "categories",
            foreignKey: "id_category"
        });
        ProductEntry.belongsTo(models.Colors, {
            as: "colors",
            foreignKey: "id_color"
        });
        ProductEntry.belongsTo(models.Brands, {
            as: "brands",
            foreignKey: "id_brand"
        });
    }
    return ProductEntry;
}