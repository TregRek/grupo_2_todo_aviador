module.exports = (sequelize, dataTypes) => {
    let alias = "Categories"
    let cols = {
        idCategory: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        }
    }
    let config= {
        tableName: "categories",
        timestamps: false
    }

    const Category = sequelize.define(alias, cols, config);
    Category.associate = (models) => {
        Category.hasMany(models.ProductEntry, {
            as: "productEntries",
            foreignKey: "idCategory"
        });
    }
    return Category;
}