module.exports = (sequelize, dataTypes) => {
    let alias = "Categories"
    let cols = {
        id_category: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name_category: {
            type: dataTypes.STRING
        }
    }
    let config= {
        tableName: "category",
        timestamps: false
    }

    const Category = sequelize.define(alias, cols, config);
    Category.associate = (models) => {
        Category.hasMany(models.ProductEntries, {
            as: "productEntries",
            foreignKey: "id_category"
        });
    }
    return Category;
}