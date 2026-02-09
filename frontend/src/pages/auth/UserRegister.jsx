import React, { useState } from "react";
import axios from 'axios'
import { useNavigate,Link } from "react-router-dom";


function UserRegister() {
  const navigate=useNavigate()
  let[userData,setUserData]=useState({fullname:"",email:"",password:""})
  
 const handleUserInput=(e)=>{
    setUserData((pre)=>({...pre,[e.target.name]:e.target.value}))

  }
  const handleSubmit=async (e)=>{
    
    e.preventDefault();
    const payload={fullname:userData.fullname,
      email:userData.email,
      password:userData.password
    }
   const response= await axios.post("http://localhost:8080/api/auth/user/register",payload, { withCredentials: true })
   

   console.log(response.data)
   navigate("/home")

  }
 
  return (
    <div className="w-full h-screen bg-gray-500 flex justify-center items-center ">
      <div className="w-[90%] rounded-xl h-[80%] bg-amber-50 md:w-[50%] flex flex-col items-center gap-5">
        <div className="flex flex-col mt-2 gap-2 items-center text-xl">
          <h1 className="font-semibold">Welcome back</h1>
          <p>Create Account!</p>
        </div>
        <div className="w-full">
          <form onSubmit={handleSubmit} action="" className="flex flex-col items-center gap-10">
            <div className="w-[90%] bg-gray-400 rounded-xl">
              <input
              onChange={handleUserInput} value={userData.fullname} name="fullname" className="bg-gray-300 w-full h-13 p-3 rounded-xl"
                type="text"
                placeholder="enter fullname"
              />
            </div>
            <div className=" w-[90%] bg-gray-400 rounded-xl">
              <input
               name="email" onChange={handleUserInput} value={userData.email} className="bg-gray-300 w-full h-13  p-3 rounded-xl"
                type="email"
                placeholder="email"
              />
            </div>
            <div className="w-[90%] bg-gray-400 rounded-xl">
              <input
              onChange={handleUserInput} name="password" value={userData.password} className="bg-gray-300 w-full h-13 p-3 rounded-xl"
                type="password"
                placeholder="password"
              />
            </div>
            <div>
              <button  className='bg-gray-600 hover:bg-gray-300 text-amber-50 py-2 px-7 rounded-xl'>create Account</button>
            </div>
          </form>
        </div>
        <div>Already Account/ <Link className="font-semibold text-blue-950" to="/user/login">Login</Link></div>
      </div>
      
    </div>
  );
}

export default UserRegister;
