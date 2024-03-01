const express=require("express");
const { protectRoute } = require("../controllers/authController");
const { getUserProfile, updateProfile } = require("../controllers/userController");

const router=express.Router();

router.get('/profile/:userId',protectRoute,getUserProfile);
router.patch("/update-profile",protectRoute,updateProfile);

module.exports=router;