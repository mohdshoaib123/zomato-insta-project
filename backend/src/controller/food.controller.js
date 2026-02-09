const Food=require("../models/food.model")
const storageService=require("../services/storage.services")
const {v4:uuid}=require("uuid") 
const Like=require("../models/like.model")
const Save=require("../models/save.model")


async function createFood(req,res){
  
  
  
 
  const fileUploadResult=await storageService.uploadFile(req.file.buffer,uuid() )
  const{name,description}=req.body
  const food=new Food({name:name,video:fileUploadResult.url,description:description,
    foodPartner:req.foodPartner
  })
  await food.save();
  
  res.status(201).json({message:"food created successfully",
    food:food })

}
 async function getFoodItem(req,res) {
  const foodItem=await Food.find({})
  res.status(200).json({
    message:"food item fetch successfully",
    foodItem:foodItem
  })
  
 }
 async function likeFoodItem(req,res){
  const{foodId}=req.body
  const user=req.user
  const isLiked=await Like.findOne({food:foodId,user:user._id})

  if(isLiked){
    await Like.findByIdAndDelete(isLiked._id)
    await Food.findByIdAndUpdate(foodId,{$inc:{likecount:-1}})
   return res.status(200).json({message:"food item unLiked successfully",})
  


  }
  const like=new Like({food:foodId,user:user}) 
  await like.save()
  await Food.findByIdAndUpdate(foodId,{$inc:{likeCount:1}})
  res.status(200).json({message:"food item liked successfully",like:like}) 
 }


 async function saveFoodItem(req,res){
  const{foodId}=req.body
  const user=req.user
  const isSaved=await Save.findOne({food:foodId,user:user._id})
  if(isSaved){
    await Save.findByIdAndDelete(isSaved._id)
   return res.status(200).json({message:"food item unsaved successfully"})
  }
  const save1=new Save({food:foodId,user:user})
  await save1.save()
  res.status(200).json({message:"food item saved successfully",isSave:"save"})    
 }
 async function getSavedFoodItems(req,res){
  const user=req.user
  const foodItems= await Save.find({user:user._id}).populate("food")
  if(!foodItems || foodItems.length===0){
    return res.status(404).json({message:"no saved food item found"})
  }
  
  res.status(200).json({message:"saved food items fetch successfully",foodItems:foodItems})
 }

module.exports={createFood,getFoodItem,likeFoodItem,saveFoodItem,getSavedFoodItems}