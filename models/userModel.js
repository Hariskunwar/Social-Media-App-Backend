const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

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

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    this.password=await bcrypt.hash(this.password,10);
})

module.exports=mongoose.model("User",userSchema);