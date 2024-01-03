const express = require("express")
const router = express.Router();
const {Comments} = require("../models")
const {validateToken}  = require('../middlewares/lol')

router.get("/:postId" ,async(req,res) => {
    const postId = req.params.postId;
    

    const comments = await Comments.findAll({where: {PostId: postId}});
    res.json(comments)

});

router.post("/",validateToken, async(req,res)=> {
    const comment = req.body;
    const username = req.user.Username;
    comment.Username =username;
     await Comments.create(comment);
    res.send(comment);
});


router.delete("/:commentId", validateToken, async(req, res)=> {

    const commentId = req.params.commentId;
   await Comments.destroy({
        where: {
            id : commentId,
        },
    });

    res.json("comment deleted")
} );





module.exports = router;