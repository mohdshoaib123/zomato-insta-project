import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BottomNavigation from '../../components/BottomNavigation'
import './Saved.css'
import { RiBookmarkLine, RiChat3Line} from "react-icons/ri";
import axios from 'axios';

function Saved() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [savedVideos, setSavedVideos] = useState([])
  const containerRef = useRef(null)
  const scrollTimeoutRef = useRef(null)
  const isScrollingRef = useRef(false)

  const handleScroll = () => {
    if (isScrollingRef.current) return

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const container = containerRef.current
      if (!container) return

      const scrollPosition = container.scrollTop
      const windowHeight = container.clientHeight
      const newIndex = Math.round(scrollPosition / windowHeight)

      setCurrentIndex(Math.min(newIndex, savedVideos.length - 1))
      isScrollingRef.current = false
    }, 50)
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [savedVideos.length])

  useEffect(() => {
   axios.get("http://localhost:8080/api/food/save", { withCredentials: true })
    .then((response)=>{
      const foodItems=response.data.foodItems
      const foodVideo=foodItems.map((item)=>({_id:item.food._id,video:item.food.video,description:item.food.description,name:item.food.name,foodPartner:item.food.foodPartner,likeCount:item.food.likeCount}))

      setSavedVideos(foodVideo)
    })
    .catch((error)=>{
      console.error("Error fetching saved videos:",error)
    }) 
    
},[])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      const videoEls = container.querySelectorAll('video')
      videoEls.forEach((vid, i) => {
        if (i === currentIndex) {
          vid.play().catch(() => {})
        } else {
          vid.pause()
          vid.currentTime = 0
        }
      })
    }
  }, [currentIndex, savedVideos])

  if (savedVideos.length === 0) {
    return (
      <>
        <div className="saved-empty">
          <h2>No Saved Videos Yet</h2>
          <p>Start bookmarking videos to see them here!</p>
          <Link to="/" className="back-to-home">
            Back to Home
          </Link>
        </div>
        <BottomNavigation />
      </>
    )
  }

  return (
    <>
      <div className="saved-container" ref={containerRef}>
        {savedVideos.map((videoOne) => (
          <div key={videoOne._id} className="video-reel">
            <video
              src={videoOne.video}
              className="video-content"
              muted
              autoPlay
              loop
              playsInline
            />

            <div className="video-overlay">
              <div className="video-info">
                <p className="video-description">{videoOne.description}</p>
                <Link to={'/food-partner/' + videoOne.foodPartner} className="visit-store-btn">
                  Visit Store
                </Link>
              </div>
            </div>

            <div className="video-actions">
              <div className="action-item">
                <span className="icon">♥</span>
                <span className="count">{videoOne.likeCount}</span>
              </div>
              <div className="action-item">
                <span className="icon"><RiChat3Line /></span>
                <span className="count">{videoOne.saves || 0}</span>
              </div>
              <div className="action-item">
                <span className="icon"><RiBookmarkLine /></span>
                <span className="count">{videoOne.comments || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <BottomNavigation />
    </>
  )
}

export default Saved
