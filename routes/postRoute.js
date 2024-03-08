const express=require("express");
const { protectRoute } = require("../controllers/authController");
const { createPost, getPost, getPostOfFollowings, postLikeUnlike, getUserPosts, addComment, deleteComment, deletePost } = require("../controllers/postController");

const router=express.Router();

router.get("/feed",protectRoute,getPostOfFollowings);
router.get("/:id",protectRoute,getPost);
router.get("/user/:userId",protectRoute,getUserPosts);
router.post("/",protectRoute,createPost);
router.post("/like/:postId",protectRoute,postLikeUnlike);
router.post("/comment/:postId",protectRoute,addComment);
router.delete("/comment/:postId/:commentId",protectRoute,deleteComment);
router.delete("/:id",protectRoute,deletePost)


module.exports=router;