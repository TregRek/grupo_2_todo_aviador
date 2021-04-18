module.exports = (sequelize, dataTypes) => {
    let alias = "Brands"
    let cols = {
        idBrand: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        }
    }
    let config= {
        tableName: "brands",
        timestamps: false
    }

    const Brand = sequelize.define(alias, cols, config);
    return Brand;
}