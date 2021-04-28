module.exports = (sequelize, dataTypes) => {
    let alias = "Sizes"
    let cols = {
        id_size: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        size: {
            type: dataTypes.STRING
        }
    }
    let config= {
        tableName: "size",
        timestamps: false
    }

    const Size = sequelize.define(alias, cols, config);
    Size.associate = (models) => {
        Size.hasMany(models.ProductEntries, {
            as: "productEntries",
            foreignKey: "id_size"
        });
    }
    return Size;
}