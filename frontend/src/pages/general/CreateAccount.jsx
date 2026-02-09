import React from 'react'
import { Link } from 'react-router-dom'

function CreateAccount() {
  return (
    <div className="w-full h-screen bg-gray-500 flex justify-center items-center ">
      <div className="w-[90%] rounded-xl h-[70%] bg-amber-50 md:w-[50%] flex flex-col items-center  gap-30">
        <div className="flex flex-col mt-2 gap-2 items-center text-xl">
          <h1 className="font-semibold">Welcome back</h1>
          <p>Create Account!</p>
        </div>
            
          
        
        <div ><Link className='bg-gray-600 w-full text-xl hover:bg-gray-300 text-amber-50 py-5 px-7 rounded-xl' to="/user/register">Login & Create user Account</Link></div>
      
      
        
        <div><Link className='bg-gray-600 hover:bg-gray-300 text-lg text-amber-50 py-5 px-7 rounded-xl' to="/foodpartner/register">Login & Create partner Account</Link></div>
      </div>
    </div>
      
    
  )
}

export default CreateAccount
