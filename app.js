const express=require("express");
const authRouter=require('./routes/authRoute');
const errorHandler=require("./controllers/errorController");
const CustomError = require("./utils/CustomError");
const userRouter=require("./routes/userRoute");
const postRouter=require("./routes/postRoute");
const messageRouter=require("./routes/messageRoutes");
require("dotenv").config();
const {server}=require('./socket');
const dbConnect=require("./config/dbConnect");
const {app}=require("./socket");

app.use(express.json());

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/posts",postRouter);
app.use("/api/v1/messages",messageRouter);

//default route
app.all("*",(req,res,next)=>{
    next(new CustomError(`This url not found: ${req.originalUrl}`));
})

app.use(errorHandler);

dbConnect();
const PORT=process.env.PORT||5000;
server.listen(PORT,()=>{
    console.log("Server started at port:",PORT);
});