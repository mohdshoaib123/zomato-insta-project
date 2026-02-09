import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'

function FoodPartnerRegister() {
  const navigate=useNavigate()
    let[partnerData,setPartnerData]=useState({name:"",email:"",password:""})
  const handlePartnerInput=(e)=>{
setPartnerData((pre)=>({...pre,[e.target.name]:e.target.value}))
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const payload={
      name:partnerData.name,
      email:partnerData.email,
      password:partnerData.password
    }
   const response=await axios.post("http://localhost:8080/api/auth/foodpartner/register",payload,{withCredentials:true})
 console.log(response.data)
 
navigate("/create-food")}
  
  return (
  <div className="w-full h-screen bg-gray-500 flex justify-center items-center ">
      <div className="w-[90%] rounded-xl h-[70%] bg-amber-50 md:w-[50%] flex flex-col items-center gap-5">
        <div className="flex flex-col mt-2 gap-2 items-center text-xl">
          <h1 className="font-semibold">Welcome back</h1>
          <p>Create  Foodpartner Account</p>
        </div>
        <div className="w-full">
          <form onSubmit={handleSubmit} action="" className="flex flex-col items-center gap-10">
            <div className="w-[90%] bg-gray-400 rounded-xl">
              <input
              onChange={handlePartnerInput} name='name' value={partnerData.name} className="bg-gray-300 w-full h-13 p-3 rounded-xl"
                type="text"
                placeholder="enter name"
              />
            </div>
            <div className=" w-[90%] bg-gray-400 rounded-xl">
              <input
              onChange={handlePartnerInput} name='email' value={partnerData.email}   className="bg-gray-300 w-full h-13  p-3 rounded-xl"
                type="email"
                placeholder="email"
              />
            </div>
            <div className="w-[90%] bg-gray-400 rounded-xl">
              <input
              onChange={handlePartnerInput} name='password' value={partnerData.password}  className="bg-gray-300 w-full h-13 p-3 rounded-xl"
                type="password"
                placeholder="password"
              />
            </div>
            <div>
              <button  className='bg-gray-600 hover:bg-gray-300 text-amber-50 py-2 px-7 rounded-xl'>create Account</button>
            </div>
          </form>
        </div>
        <div>Already Account/ <Link className="font-semibold text-blue-950" to="/foodpartner/login">Login</Link></div>
              
        
      </div>
    </div>
  )
}

export default FoodPartnerRegister;
