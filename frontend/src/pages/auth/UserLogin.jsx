import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function UserLogin() {
  const navigate=useNavigate()
  let[userData,setUserData]=useState({email:"",
    password:""
  })
  const handleUserData=(e)=>{
    setUserData((pre)=> ({...pre,[e.target.name]:e.target.value}))
  }
  const handleSubmit= async (e)=>{
    e.preventDefault()
    const payload={
      email:userData.email,
      password:userData.password
    }
   const response=await axios.post("http://localhost:8080/api/auth/user/login",payload,{withCredentials:true})
   console.log(response)
   navigate("/home")

  }
  return (
    <div className=' w-full h-screen  bg-gray-500 flex  flex-col justify-center items-center  '>
      <div className=' w-[90%] md:w-[50%] h-[70%] shadow-2xl  bg-yellow-50 flex  flex-col gap-10 rounded-lg'>
     <div className='flex flex-col items-center text-xl gap-3 mt-2'><h2 className='font-bold'>Welcome back</h2>
     <p >login </p></div>
     <div ><form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-10' action="">
      
      <input onChange={handleUserData} name='email' value={userData.email}className='bg-gray-300 w-[80%] h-16 p-3 rounded-xl  'type="email"  placeholder='Email' />
    
      <input onChange={handleUserData} value={userData.password} name="password"
      className='bg-gray-300 w-[80%] h-16  p-3 rounded-xl' type="password"  placeholder='password' />
      <button className='bg-gray-600 hover:bg-gray-300 text-amber-50 py-2 px-7 rounded-xl'>login</button></form></div>
      </div>

    
    </div> 
  )
}

export default UserLogin
