const express=require("express");
const { protectRoute } = require("../controllers/authController");
const { createPost, getPost } = require("../controllers/postController");

const router=express.Router();

router.get("/:id",protectRoute,getPost);
router.post("/",protectRoute,createPost);

module.exports=router;