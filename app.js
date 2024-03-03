const express=require("express");
const authRouter=require('./routes/authRoute');
const errorHandler=require("./controllers/errorController");
const CustomError = require("./utils/CustomError");
const userRouter=require("./routes/userRoute");
const postRouter=require("./routes/postRoute");

const app=express();

app.use(express.json());

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/posts",postRouter);

//default route
app.all("*",(req,res,next)=>{
    next(new CustomError(`This url not found: ${req.originalUrl}`));
})

app.use(errorHandler);

module.exports=app;