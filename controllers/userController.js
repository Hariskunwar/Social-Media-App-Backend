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