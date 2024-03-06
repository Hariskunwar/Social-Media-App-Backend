const express=require("express");
const { protectRoute } = require("../controllers/authController");
const { createPost, getPost, getPostOfFollowings, postLikeUnlike, getUserPosts } = require("../controllers/postController");

const router=express.Router();

router.get("/feed",protectRoute,getPostOfFollowings);
router.get("/:id",protectRoute,getPost);
router.get("/user/:userId",protectRoute,getUserPosts);
router.post("/",protectRoute,createPost);
router.post("/like/:postId",protectRoute,postLikeUnlike);



module.exports=router;