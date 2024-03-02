const express=require("express");
const { protectRoute } = require("../controllers/authController");
const { getUserProfile, updateProfile, changePassword, followUnfollowUser } = require("../controllers/userController");

const router=express.Router();

router.get('/profile/:userId',protectRoute,getUserProfile);
router.patch("/update-profile",protectRoute,updateProfile);
router.patch("/change-password",protectRoute,changePassword);
router.post("/follow/:id",protectRoute,followUnfollowUser);

module.exports=router;