module.exports = (sequelize, dataTypes) => {
    let alias = "Brands"
    let cols = {
        id_brand: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name_brand: {
            type: dataTypes.STRING
        }
    }
    let config= {
        tableName: "brand",
        timestamps: false
    }

    const Brand = sequelize.define(alias, cols, config);
    Brand.associate = (models) => {
        Brand.hasMany(models.ProductEntries, {
            as: "productEntries",
            foreignKey: "id_brand"
        });
    }
    return Brand;
}