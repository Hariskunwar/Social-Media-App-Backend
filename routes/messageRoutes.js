const express=require("express");
const { protectRoute } = require("../controllers/authController");
const { sendMessage, getMessages } = require("../controllers/messageController");

const router=express.Router();

router.post("/send/:reciverId",protectRoute,sendMessage);
router.get("/:chatWithId",protectRoute,getMessages);

module.exports=router;