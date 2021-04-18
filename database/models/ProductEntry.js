module.exports = (sequelize, dataTypes) => {
    let alias = "ProductEntries"
    let cols = {
        idProdEntry: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idColor: {
            type: dataTypes.INTEGER
        },
        idCategory: {
            type: dataTypes.INTEGER
        },
        idSize: {
            type: dataTypes.INTEGER
        },
        idBrand: {
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
        tableName: "productentries"
    }

    const ProductEntry = sequelize.define(alias, cols, config);
    ProductEntry.associate = (models) => {
        ProductEntry.hasMany(models.CartProd, {
            as: "cartProducts",
            foreignKey: "idProdEntry"
        });
        ProductEntry.belongsTo(models.Product, {
            as: "products",
            foreignKey: "idProduct"
        });
        ProductEntry.belongsTo(models.Size, {
            as: "sizes",
            foreignKey: "idSize"
        });
        ProductEntry.belongsTo(models.Category, {
            as: "categories",
            foreignKey: "idCategory"
        });
        ProductEntry.belongsTo(models.Color, {
            as: "colors",
            foreignKey: "idColor"
        });
    }
    return ProductEntry;
}