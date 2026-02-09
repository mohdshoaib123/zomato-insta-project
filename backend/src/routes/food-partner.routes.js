const express=require('express');
const authMiddleware=require("../middleware/auth.middleware")
const getFoodItemOfPartner=require("../controller/getFoodItemOfPartner")

const router=express.Router();



router.post("/:id",authMiddleware.authUserMiddleware,getFoodItemOfPartner)



module.exports=router