const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter name"]
    },
    email:{
        type:String,
        required:[true,"Email already exist"],
        unique:[true,"Email already exist"]
    },
    password:{
        type:String,
        required:[true,"Please enter password"],
        minLength:[6,"Password should have atleast 6 character"],
        select:false
    },
    profilePic:String,
    bio:String
},{timestamps:true});


module.exports=mongoose.model("User",userSchema);