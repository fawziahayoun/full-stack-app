

module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define("Likes",{
        
    });

    Likes.associate =(models) => {
        Likes.belongsTo(models.Users, {
            foreignKey : {
                allowNull : false
            }

        })
    };
    Likes.associate =(models) => {
        Likes.belongsTo(models.Posts, {
            foreignKey : {
                allowNull : false
            }

        })
    };
    return Likes;
 };

