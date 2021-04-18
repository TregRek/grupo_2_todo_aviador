module.exports = (sequelize, dataTypes) => {
    let alias = "Colors"
    let cols = {
        idColor: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        }
    }
    let config= {
        tableName: "colors",
        timestamps: false
    }

    const Color = sequelize.define(alias, cols, config);
    Color.associate = (models) => {
        Color.hasMany(models.ProductEntry, {
            as: "productEntries",
            foreignKey: "idColor"
        });
    }
    return Color;
}