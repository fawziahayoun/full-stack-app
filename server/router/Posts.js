
 
const express = require("express")
const router = express.Router();
const {Posts, Likes} = require("../models")


const {validateToken}  = require('../middlewares/lol');


router.get("/",validateToken, async(req,res)=> {
    const getPosts = await Posts.findAll( {include: [Likes]}) ;
    const likedPosts = await Likes.findAll({where:  {UserId: req.user.id}});
    res.json({getPosts: getPosts, likedPosts:likedPosts});
    

});




router.post("/",validateToken, async(req, res)=> {
    const post = req.body;
    post.Username = req.user.Username;
    post.UserId = req.user.id;
    await Posts.create(post);
    res.json(post);
})

router.get("/byId/:id",validateToken, async(req, res)=> {
    const id = req.params.id;
    const post = await Posts.findOne({where:{id : id},include :[Likes] })
    const likedPosts = await Likes.findAll({where:  {UserId: req.user.id}});
    res.json({post: post, likedPosts:likedPosts});

});
router.get("/byuserId/:id",validateToken, async(req,res)=> {
    const id = req.params.id;
    const listOfPsts = await Posts.findAll({where: {UserId : id}, include :[Likes]});
    res.json(listOfPsts);
})


router.delete("/postId/:id", validateToken, async(req, res)=> {

    const id = req.params.id;
   await Posts.destroy({
        where: {
            id : id,
        },
    });

    res.json("post deleted")
} );


router.put("/title", validateToken, async(req,res) => {
    const {nweTitle, id} = req.body;
    await Posts.update({title : nweTitle} , {where: {id: id}});

    res.json(nweTitle);
});

router.put("/text", validateToken, async(req,res) => {
    const {nweText, id} = req.body;
    await Posts.update({PostsText : nweText} , {where: {id: id}});

    res.json(nweText);
})

module.exports = router;