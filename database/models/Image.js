module.exports = (sequelize, dataTypes) => {
    let alias = "Images"
    let cols = {
        idImg: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nameImg: {
            type: dataTypes.STRING
        }
    }
    let config= {
        tableName: "images",
        timestamps: false
    }

    const Image = sequelize.define(alias, cols, config);
    Image.associate = (models) => {
        Image.hasMany(models.ProductImage, {
            as: "products",
            foreignKey: "idImg"
        }); 
    }
    return Image;
}