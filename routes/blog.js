const {Router}= require("express")
const multer = require("multer")
const path = require("path")
const router = Router();
const {Blog} = require("../models/blog")
const comment = require("../models/comments")
const {User} = require("../models/user")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve("./public/uploads/"))
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    }
  })
  
  const upload = multer({ storage: storage })
  

router.get("/add-new",(req,res)=>{
    res.render("addBlog",{
        user : req.user ,
    })
})
router.get("/:id", async(req,res)=>{
    const blog = await Blog.findById(req.params.id).populate("createdBy")
    const Comments = await comment.find({blogId:req.params.id}).populate("createdBy")
    console.log(Comments)
    return res.render("blog",{
        user: req.user,
        blog,
        Comments,
        
    })
})

router.post("/", upload.single("coverImage"), async (req,res)=>{
    const {title, body}=req.body;
    const blog = await Blog.create({
        body,
        title,
        createdBy : req.user._id,
        coverImageURL : `/uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`)
})
router.post("/comment/:blogId", async(req,res)=>{

    await comment.create({
        content : req.body.content,
        blogId : req.params.blogId,
        createdBy : req.user._id
    })
    return res.redirect(`/blog/${req.params.blogId}`)
})
module.exports = router;