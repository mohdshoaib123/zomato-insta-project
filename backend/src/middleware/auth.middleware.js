const Foodpartner=require("../models/foodpartner.model")
const jwt=require("jsonwebtoken")
const User=require("../models/user.model")

async function authFoodPartnerMiddleWare(req,res,next){
  const token=req.cookies.token;
  if(!token){
    return res.status(401).json("please login first")
  }
  try{
    const decode=jwt.verify(token,process.env.JWT_SECRET)
    
    const foodPartner=await Foodpartner.findById(decode.id)
    
req.foodPartner=foodPartner
next()

  }
  catch(err){
return res.status(401).json({message:"Invalid token"})

  }
}

async function authUserMiddleware(req,res,next) {
  const token=req.cookies.token
  if(!token){
    return res.status(401).json({message:"login first"})
  }
  try{
    const decode=jwt.verify(token,process.env.JWT_SECRET)
    const user= await User.findById(decode.id)
    req.user=user
    next()

  }
  catch(err){
    return res.status(401).json({message:"Invalid token"})
  }
  
}

module.exports={authFoodPartnerMiddleWare,authUserMiddleware}