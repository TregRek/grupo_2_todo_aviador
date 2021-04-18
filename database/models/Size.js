module.exports = (sequelize, dataTypes) => {
    let alias = "Sizes"
    let cols = {
        idSize: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        }
    }
    let config= {
        tableName: "sizes",
        timestamps: false
    }

    const Size = sequelize.define(alias, cols, config);
    Size.associate = (models) => {
        Size.hasMany(models.ProductEntry, {
            as: "productEntries",
            foreignKey: "idSize"
        });
    }
    return Size;
}