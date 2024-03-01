const User=require("../models/userModel");
const jwt=require("jsonwebtoken");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError=require("../utils/CustomError");
const util=require("util");

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

//user login
exports.login=asyncErrorHandler(async (req,res,next)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email}).select("+password");
    if(!user||!(await user.comparePassword(password,user.password))){
        return next(new CustomError("Incorrect email or password",400));
    }
    const token=signToken(user._id);
    res.status(200).json({
        status:"success",
        token
    });
});

//auth middleware
exports.protectRoute=asyncErrorHandler(async (req,res,next)=>{
    const authHeader=req.headers.authorization;
    let token;
    if(authHeader && authHeader.startsWith("Bearer")){
        token=authHeader.split(" ")[1];
    }
    if(!token){
        return next(new CustomError("You are not logged in",401));
    }
    const decoded=await util.promisify(jwt.verify)(token,process.env.JWT_SECRET);
    const user=await User.findById(decoded.id);
    if(!user){
        return next(new CustomError("Invalid token",401));
    }
    req.user=user;
    next();
});