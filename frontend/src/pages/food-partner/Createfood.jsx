import React, { useState } from 'react'
import './Createfood.css'
import axios from 'axios' 
import { useNavigate } from 'react-router-dom'

function Createfood() {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    video: null
  })
const handleInput=(e)=>{
  setFormData((pre)=>({...pre,[e.target.name]:e.target.value}))
}
 const handleSubmit = async (e) => {
    e.preventDefault()
    const data=new FormData()
    data.append("name",formData.name)
    data.append("description",formData.description)
    data.append("video",formData.video)
   const response=await axios.post('http://localhost:8080/api/food/',data,{withCredentials:true})
   console.log(response.data)
   alert("Food item created successfully")
   setFormData({name:'',description:'',video:null})
   navigate("/create-food")
  }
  const handleInputVideo=(e)=>{
    setFormData((pre)=>({...pre,video:e.target.files[0]}))}
  return (
    <div className='create-food-container'>
      <div className='create-food-card'>
        <div className='create-food-header'>
          <h2>Create Food</h2>
          <p>Add a new food item to your menu</p>
        </div>

        <form onSubmit={handleSubmit} className='create-food-form'>
          {/* Video Input */}
          <div className='form-group'>
            <label htmlFor='video'>Food Video</label>
            <div className='video-input-wrapper'>
              <input
                type='file'
                id='video'
                name='video'
                accept='video/*'
                onChange={handleInputVideo}
                className='video-input'
              />
              <div className='video-upload-content'>
                {formData.video ? (
                  <>
                    <svg className='video-check-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
                      <polyline points='20 6 9 17 4 12'></polyline>
                    </svg>
                    <p className='video-file-name'>{formData.video.name}</p>
                    <p className='video-file-size'>
                      {(formData.video.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </>
                ) : (
                  <>
                    <svg className='video-upload-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
                      <path d='M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z'></path>
                      <circle cx='12' cy='13' r='4'></circle>
                    </svg>
                    <p className='video-upload-text'>Click to upload video</p>
                    <p className='video-upload-hint'>or drag and drop</p>
                    <p className='video-upload-format'>MP4, WebM, or Ogg</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Name Input */}
          <div className='form-group'>
            <label htmlFor='name'>Food Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleInput}
              placeholder='Enter food name'
              className='form-input'
              required
            />
          </div>

          {/* Description Input */}
          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleInput}
              placeholder='Enter food description'
              className='form-textarea'
              rows='5'
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button type='submit' className='submit-btn'>
            Create Food Item
          </button>
        </form>
      </div>
    </div>
  )
}

export default Createfood
