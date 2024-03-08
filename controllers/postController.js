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

//post like and unlike functionality
exports.postLikeUnlike=asyncErrorHandler(async (req,res,next)=>{
    const {postId}=req.params;
    const userId=req.user._id;
    //find post
    const post=await Post.findById(postId);
    if(!post){
        return next(new CustomError("post not found",404));
    }
    //if already liked then remove like
    if(post.likes.includes(userId)){
        await Post.findByIdAndUpdate(postId,{$pull:{likes:userId}});
        res.status(200).json({
        status:"success",
        message:"post unliked successfully"
    });
    }
    else{
        await Post.findByIdAndUpdate(postId,{$push:{likes:userId}});
        res.status(200).json({
        status:"success",
        message:"post liked successfully"
    });
    }
});

//get users all post
exports.getUserPosts=asyncErrorHandler(async (req,res,next)=>{
    const user=await User.findById(req.params.userId);
    if(!user){
        return next(new CustomError("user not found",404));
    }
    const posts=await Post.find({postedBy:user._id}).sort({createdAt:-1});
    res.status(200).json({
        status:"success",
        data:{
            posts
        }
    });
});

//comment on post
exports.addComment=asyncErrorHandler(async (req,res,next)=>{
    const {comment}=req.body;
    const {postId}=req.params;
    const post=await Post.findById(postId);
    if(!post){
        return next(new CustomError("Post not found",404));
    }
    await Post.findByIdAndUpdate(post._id,{$push:{comments:
        { 
            commentBy:req.user._id,
            comment:comment
        }}});
        res.status(200).json({
            status:"success",
            message:"comment added successfully"
        });
});

//delete a comment
exports.deleteComment=asyncErrorHandler(async (req,res,next)=>{
    const {postId,commentId}=req.params;
    const post=await Post.findById(postId);
    if(!post){
        return next(new CustomError("Post not found",404));
    }
    const commentIndex=post.comments.findIndex((comment)=>{
        return comment._id.toString()===commentId.toString();
    })
    //check comment exists or not
    if(commentIndex===-1){
        return next(new CustomError("comment not found",404));
    }
    //only post owner and comment owner can delete a comment
    if(post.postedBy.toString()===req.user._id.toString()||
       post.comments[commentIndex].commentBy.toString()===req.user._id.toString()){
        await Post.findByIdAndUpdate(postId,{$pull:{comments:{_id:commentId}}});
        res.status(200).json({
            status:"success",
            message:"comment deleted successfully"
        });
    }else{
        next(new CustomError("You are not authorized to delete this comment",401))
    }
});

//delete a post
exports.deletePost=asyncErrorHandler(async (req,res,next)=>{
    const post=await Post.findById(req.params.id);
    if(!post){
        return next(new CustomError("post not found",404));
    }
    if(post.postedBy.toString()!==req.user._id.toString()){
        return next(new CustomError("unauthorized to delete",401));
    }
    await Post.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(req.user._id,{$pull:{posts:req.params.id}});
    res.status(200).json({
        status:"success",
        message:"post deleted successfully"
    });
});