const User=require("../models/userModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

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