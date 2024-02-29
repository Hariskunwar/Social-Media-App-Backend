const User=require("../models/userModel");
const jwt=require("jsonwebtoken");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const signToken=(id)=>{
    return jwt.sign({id:id},process.env.JWT_SECRET,{expiresIn:'7d'});
}

exports.signup=asyncErrorHandler(async (req,res)=>{
        const newUser=await User.create(req.body);
        const token=signToken(newUser._id)
        res.status(201).json({
            status:"success",
            token,
            data:{
                user:newUser
            }
        });
    });