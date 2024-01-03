

module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments",{
        CommentBody :{
            type: DataTypes.STRING,
            allowNull: false,
        },
        Username :{
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    Comments.associate =(models) => {
        Comments.belongsTo(models.Posts, {
            foreignKey : {
                allowNull : false
            }

        })
    };
    return Comments;
 };