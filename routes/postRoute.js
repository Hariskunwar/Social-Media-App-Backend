const express=require("express");
const { protectRoute } = require("../controllers/authController");
const { createPost, getPost, getPostOfFollowings } = require("../controllers/postController");

const router=express.Router();

router.get("/feed",protectRoute,getPostOfFollowings);
router.get("/:id",protectRoute,getPost);
router.post("/",protectRoute,createPost);


module.exports=router;