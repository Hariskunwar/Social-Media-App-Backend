const express=require("express");
const { protectRoute } = require("../controllers/authController");
const { createPost } = require("../controllers/postController");

const router=express.Router();

router.post("/",protectRoute,createPost);

module.exports=router;