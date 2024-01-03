const express = require("express")
const router = express.Router();
const {Users} = require("../models")
const {sign} = require("jsonwebtoken")
const {validateToken}  = require('../middlewares/lol');
const {bcrypt} = require("bcryptjs");




router.post("/", async(req, res)=> {
    const {Username, Password} = req.body;
    Users.create({
        Username :Username,
        Password : Password
    });

     res.json("succes");
})

router.post("/login", async(req, res)=> {
    const {Username, Password} = req.body;
    const user = await Users.findOne({where: {Username : Username}});
    if(!user)
    {
        res.json({error : "users dosn't exest"});  
    } else{


        if(Password == user.Password){
 const accessToken = sign({Username : user.Username, id: user.id},
     "importantsecret"
    )


            res.json({token:accessToken,Username : Username, id:user.id ,  });




        }else{
            res.json({error : "wrrong password"});  

        }
  
    }

});

router.get("/auth",validateToken,(req, res)=> {

     res.json(req.user);
})


router.get("/basicinfo/:id",async(req,res)=>{
    const id = req.params.id;
    const basicinfo = await Users.findByPk(id, {
       attributes: {exclude:["Password"]}, 
    }) ;

    res.json(basicinfo)

});





module.exports = router;