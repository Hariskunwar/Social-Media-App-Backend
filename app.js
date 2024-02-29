const express=require("express");
const authRouter=require('./routes/authRoute');
const errorHandler=require("./controllers/errorController");
const CustomError = require("./utils/CustomError");

const app=express();

app.use(express.json());

app.use("/api/v1/auth",authRouter);

//default route
app.all("*",(req,res,next)=>{
    next(new CustomError(`This url not found: ${req.originalUrl}`));
})

app.use(errorHandler);

module.exports=app;