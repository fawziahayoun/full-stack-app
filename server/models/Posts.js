

 module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts",{
        title :{
            type: DataTypes.STRING,
            allowNull: false,
        },
        PostsText :{
            type: DataTypes.STRING,
            allowNull: false,
        },
        Username:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    })


   


    
   

    
    
   
    
    Posts.associate =(models) => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade",

        })
    };
    Posts.associate =(models) => {
        Posts.hasMany(models.Likes, {
            onDelete: "cascade",

        })
    };

   

    return Posts; 


   
 };