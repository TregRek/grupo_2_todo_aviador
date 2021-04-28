module.exports = (sequelize, dataTypes) => {
    let alias = "Colors"
    let cols = {
        id_color: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        color: {
            type: dataTypes.STRING
        }
    }
    let config= {
        tableName: "color",
        timestamps: false
    }

    const Color = sequelize.define(alias, cols, config);
    Color.associate = (models) => {
        Color.hasMany(models.ProductEntries, {
            as: "productEntries",
            foreignKey: "id_color"
        });
    }
    return Color;
}