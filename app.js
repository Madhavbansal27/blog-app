const path = require("path")
require("dotenv").config()
const express = require("express")
const app = express();
const PORT = process.env.PORT || 8000;
const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")
const {Blog} = require("./models/blog")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
mongoose.connect(process.env.MONGO_URL).then((e)=>{console.log("MongoDB connected")})

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));
app.use(checkForAuthenticationCookie("token"));
app.set("view engine", "ejs")
app.set("views",path.resolve("./views"))

 
app.get("/", async(req,res)=>{
    const allBlogs = await Blog.find({})
    res.render("home",{
        user : req.user,
        blogs: allBlogs 
    });
    console.log(req.user)
})
app.use("/user",userRoute )
app.use("/blog",blogRoute )

app.listen(PORT, ()=>{
    console.log(`server started at port ${PORT}`)
})