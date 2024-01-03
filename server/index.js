const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json())
app.use(cors());

const db = require('./models')
const routerposts = require("./router/Posts");
app.use("/post", routerposts);

const routerComments = require("./router/Comments");
app.use("/comments", routerComments);


const routerUsers = require("./router/Users");
app.use("/auth", routerUsers);


const routerLikes = require("./router/Likes");
app.use("/likes", routerLikes);


db.sequelize.sync().then( ()=> {
    app.listen(3011, ()=> {
        console.log("well")
    })
})
