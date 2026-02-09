const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware/auth.middleware")
const foodController=require("../controller/food.controller")
const multer=require("multer")
 

const upload=multer({storage:multer.memoryStorage()})

// food create route
router.post("/",authMiddleware.authFoodPartnerMiddleWare,upload.single("video"),foodController.createFood)

router.get("/",authMiddleware.authUserMiddleware,foodController.getFoodItem)

router.post("/like",authMiddleware.authUserMiddleware,foodController.likeFoodItem)

router.post("/save",authMiddleware.authUserMiddleware,foodController.saveFoodItem)

router.get("/save",authMiddleware.authUserMiddleware,foodController.getSavedFoodItems)


module.exports=router