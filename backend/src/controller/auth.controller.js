const User=require("../models/user.model.js")
const bcrypt = require('bcrypt');
const  jwt = require('jsonwebtoken');
const Foodpartner=require('../models/foodpartner.model.js')

async function registerUser(req,res) {
  const{fullname,email,password}=req.body
  const isUserAlreadyExist= await User.findOne({email});

  if(isUserAlreadyExist){
    return res.status(400).json({message:"user already exist"})
  }
  bcrypt.hash(password, 10, async function(err, hash) {
    // Store hash in your password DB.
    const user1=new User({fullname:fullname,
      email:email,
      password:hash,

    })
  await user1.save()
  const token =jwt.sign({id:user1._id,

},process.env.JWT_SECRET)
res.cookie("token",token)

res.status(201).json({message:"user registered successfully",
  user:{
    id:user1._id,
    fullname:user1.fullname,
    email:user1.email
    
  }


});



})
  
}



async function loginUser(req,res){
  let {email,password}=req.body;
  const user=await User.findOne({email})
  if(!user){
    return res.status(400).json({
      message:"Invalid email or password"

    })
  }

  bcrypt.compare(password, user.password, function(err, result) {
  if(result){
   const token =jwt.sign({id:user._id,

},process.env.JWT_SECRET)
res.cookie("token",token)

res.status(200).json({
  message:"User login successfully",
  user:{   id:user._id,
    fullname:user.fullname,
    email:user.email
    

  }
})

  }
  else{
    res.status(400).json({message:"Invalid email or password"})
  }
});
}

async function logoutUser(req,res) {
  res.clearCookie('token')
  res.status(200).json({
    message:"user logged out successfully"
  })
  
}


async function registerFoodPartner(req,res){
  if(!req.body){}
  const {name,email,password}=req.body
  const isFoodPartnerExist=await Foodpartner.findOne({email:email})
  if(isFoodPartnerExist){
    return res.status(401).json({message:"foodpartner already exist"})
  }

  bcrypt.hash(password, 10, async function(err, hash) {
    // Store hash in your password DB.

    const foodPartner= new Foodpartner({name,email,password:hash})
    await foodPartner.save()
    const token=jwt.sign({id:foodPartner._id},process.env.JWT_SECRET)
    res.cookie("token",token)
  res.status(201).json({message:"foodpartner register successfully",
    foodPartner:{
      id:foodPartner._id,
      name:foodPartner.name,
      email:foodPartner.email
    }
  })


});
}

async function loginFoodPartner(req,res){
  console.log(req.body)
  const{email,password}=req.body
  const foodPartner= await Foodpartner.findOne({email:email})

  if(!foodPartner){
  return  res.status(400).json({message:"Invalid email or password"})
  }

  bcrypt.compare(password,foodPartner.password , function(err, result) {
    // result == true
    if(!result){
      return res.status(400).json({message:"Invalid email or password"})

    }
    const token=jwt.sign({id:foodPartner._id},process.env.JWT_SECRET)
    res.cookie("token",token)
    res.status(200).json({message:"foodpartner logged in successfully",foodPartner:{id:foodPartner._id,name:foodPartner.name,email:foodPartner.email}})
});
}

async function logoutFoodPartner(req,res){
  res.clearCookie('token')
  res.status(200).json({message:"foodpartner logged out successfully"})

}

module.exports={registerUser,loginUser,logoutUser,registerFoodPartner,loginFoodPartner,logoutFoodPartner}