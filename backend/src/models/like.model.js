const mongoose=require('mongoose')

const likeSchemsa=new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true},
    food:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Food",
      required:true
    },
  
  },
  {
      timestamps:true
    })

    const Like=mongoose.model("Like",likeSchemsa)
    module.exports=Like

  
