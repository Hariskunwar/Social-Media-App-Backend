const express=require("express");
const { protectRoute } = require("../controllers/authController");
const { getUserProfile, updateProfile, changePassword, followUnfollowUser, deleteAccount } = require("../controllers/userController");

const router=express.Router();

router.get('/profile/:userId',protectRoute,getUserProfile);
router.patch("/update-profile",protectRoute,updateProfile);
router.patch("/change-password",protectRoute,changePassword);
router.post("/follow/:id",protectRoute,followUnfollowUser);
router.delete("/delete-account",protectRoute,deleteAccount);

module.exports=router;