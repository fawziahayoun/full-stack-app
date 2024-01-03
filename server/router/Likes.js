const express = require("express")
const router = express.Router();
const {Likes} = require("../models")
const {validateToken}  = require('../middlewares/lol');


router.post("/", validateToken,async (req,res)=> {
 const {PostId} = req.body;
 const UserId = req.user.id;

 const found = await Likes.findOne({where : {
    PostId : PostId, UserId: UserId
 }});


 if (!found){
    await Likes.create({ UserId : UserId, PostId: PostId});
    res.json ({ Likes: true});



 }else{
    await Likes.destroy({ where :{        UserId : UserId, PostId: PostId
    }

    });
    res.json ({Likes: false});

 }




});

module.exports = router;

