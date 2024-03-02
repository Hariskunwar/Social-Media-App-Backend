const User=require("../models/userModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError=require("../utils/CustomError");

//get user profile
exports.getUserProfile=asyncErrorHandler(async (req,res,next)=>{
    const user=await User.findById(req.params.userId);
    if(!user){
        return next(new CustomError("User not found",404));
    }
    res.status(200).json({
        status:"success",
        data:{
            user
        }
    });
});

//user updation
exports.updateProfile=asyncErrorHandler(async (req,res,next)=>{
    const user=await User.findById(req.user._id);
    if(!user){
        return next(new CustomError("User not found",404));
    }
    if(req.body.name){
        user.name=req.body.name;
    }
    if(req.body.email){
        user.email=req.body.email;
    }
    if(req.body.bio){
        user.bio=req.body.bio;
    }
    await user.save();
    res.status(200).json({
        status:'success',
        message:"profile updated successfully"
    });
});

//change password
exports.changePassword=asyncErrorHandler(async (req,res,next)=>{
    const {oldPassword,newPassword}=req.body;
    const user=await User.findById(req.user._id).select("+password");
    if(!user){
        return next(new CustomError("User not found",404));
    }
    if(!oldPassword||!newPassword){
        return next(new CustomError("please enter old and new password",404));
    }
    if(!(await user.comparePassword(oldPassword,user.password))){
        return next(new CustomError("old password does not match",404));
    }
    user.password=newPassword;
    await user.save();
    res.status(200).json({
        status:'success',
        message:"password changed successfully"
    });
});

//follow and unfollow user
exports.followUnfollowUser=asyncErrorHandler(async (req,res,next)=>{
    const {id}=req.params;
    const loggedInUser=await User.findById(req.user._id);
    const userToFollow=await User.findById(id);
    if(!userToFollow){
        return next(new CustomError("User not found",404));
    }
    if(id===req.user._id.toString()){
        return next(new CustomError("you cannot follow yourself",400));
    }
    //if already followed then unfollow
    if(loggedInUser.followings.includes(id)){
        await User.findByIdAndUpdate(req.user._id,{$pull:{followings:id}});
        await User.findByIdAndUpdate(id,{$pull:{followers:req.user._id}});
        res.status(200).json({
            status:"success",
            message:"User unfollowed successfully"
        });
    }
    //follow the user
    else{
        await User.findByIdAndUpdate(req.user._id,{$push:{followings:id}});
        await User.findByIdAndUpdate(id,{$push:{followers:req.user._id}});
        res.status(200).json({
            status:"success",
            message:"User followed successfully"
        });
    }
});