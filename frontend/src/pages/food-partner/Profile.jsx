import React, { useState } from 'react'
import './Profile.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

function Profile() {
const { id } = useParams()
const[profile,setProfile]=useState({})
const[videos,setVideo]=useState([])

useEffect(() => {
  axios.post(`http://localhost:8080/api/food-partner/${id}`,{}, { withCredentials: true })
    .then(response => {
      setProfile(response.data.partner)
      setVideo(response.data.foodItems)
      
    })
    .catch(error => {
      console.error("Error fetching food partner details:", error)
    })
}, [id])

  return (
    <div className="profile-container">
      {/* Profile Header + Stats Section */}
      <div className="profile-header">
        <div className="header-left">
          <div className="profile-image"></div>
          <div className="profile-info">
            <div className="profile-field business-name">{profile.name}</div>
            <div className="profile-field">{profile.email}</div>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <div className="stat-label">total meals</div>
            <div className="stat-value">43</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">customer serve</div>
            <div className="stat-value">15K</div>
          </div>
        </div>
      </div>

      {/* Videos Grid Section */}
      <div className="videos-grid">
        {videos.map((item, index) => (
          <div key={index} className="video-item">
            
            <video 
  style={{objectFit:'cover',width:'100%',height:'100%'}} src={item.video} muted>

            </video>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile
