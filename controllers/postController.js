const Post=require("../models/postModel");
const User=require("../models/userModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError=require("../utils/CustomError");

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

//get single post
exports.getPost=asyncErrorHandler(async (req,res,next)=>{
    const post =await Post.findById(req.params.id);
    if(!post){
        return next(new CustomError("post not found",404));
    }
    res.status(200).json({
        status:"success",
        data:{
            post
        }
    });
});

//get posts of user followings
exports.getPostOfFollowings=asyncErrorHandler(async (req,res,next)=>{
    const user=await User.findById(req.user._id);
    const posts=await Post.find({postedBy:{$in:user.followings}}).sort({createdAt:-1});
    res.status(200).json({
        status:"success",
        data:{
            feed:posts
        }
    });
});