const Foodpartner=require("../models/foodpartner.model")
const Food=require("../models/food.model")

 async function getFoodItemOfPartner(req,res){
  const {id}=req.params
  const partner=await Foodpartner.findById(id)
  const foodItems=await Food.find({foodPartner:id})
   

  res.status(200).json({partner,foodItems})
 }
module.exports=getFoodItemOfPartner