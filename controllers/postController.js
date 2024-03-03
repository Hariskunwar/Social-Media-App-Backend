const Post=require("../models/postModel");
const User=require("../models/userModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

//create a new post
exports.createPost=asyncErrorHandler(async (req,res,next)=>{
    req.body.postedBy=req.user._id;
    const newPost=await Post.create(req.body);
    await User.findByIdAndUpdate(req.user._id,{$push:{posts:newPost._id}});
    res.status(201).json({
        status:"success",
        data:{
            post:newPost
        }
    });
});

