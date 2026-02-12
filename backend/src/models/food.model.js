const mongoose=require("mongoose")

const foodSchema=new mongoose.Schema({name:{
  type:String,
  required:true

},
video:{
  type:String,
  required:true
},
description:{
  type:String
},
foodPartner:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Foodpartner"

},
likeCount:{
  type:Number,
  default:0
},
isLiked:{
  type:Boolean,
  default:false
},
isSaved:{type:Boolean, default:false }
})
const Food=mongoose.model('Food',foodSchema)
module.exports=Food