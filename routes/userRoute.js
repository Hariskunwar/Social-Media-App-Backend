const express=require("express");
const { protectRoute } = require("../controllers/authController");
const { getUserProfile } = require("../controllers/userController");

const router=express.Router();

router.get('/profile/:userId',protectRoute,getUserProfile);

module.exports=router;