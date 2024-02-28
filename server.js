require("dotenv").config();
const app=require("./app");
const dbConnect=require("./config/dbConnect");


dbConnect();
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log("Server started at port:",PORT);
})