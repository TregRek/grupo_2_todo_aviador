module.exports = (sequelize, dataTypes) => {
    let alias = "Images"
    let cols = {
        id_image: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name_Img: {
            type: dataTypes.STRING
        }
    }
    let config= {
        tableName: "image",
        timestamps: false
    }

    const Image = sequelize.define(alias, cols, config);
    Image.associate = (models) => {
        Image.hasMany(models.ProductImages, {
            as: "products",
            foreignKey: "id_img"
        }); 
    }
    return Image;
}