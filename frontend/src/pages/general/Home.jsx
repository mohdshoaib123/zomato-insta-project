import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import VideoCard from '../../components/VideoCard'
import BottomNavigation from '../../components/BottomNavigation'
import './Home.css'


function Home() {
  const navigate=useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [videos, setVideos] = useState([])
  const[isLiked,setIsLiked]=useState(false)
  const[isSaved,setIsSaved]=useState(false)
  
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

      setCurrentIndex(Math.min(newIndex, videos.length - 1))
      isScrollingRef.current = false
    }, 50)
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [videos.length])
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/food/', { withCredentials: true })
      .then((response) => {
        const allVideos=response.data.foodItem
        if (!response.data.foodItem.length){
          alert("No food videos available")
          navigate("/create-food")
        }
        
        
        setVideos(allVideos)
      })
      .catch((error) => {
        console.error('Error fetching videos:', error)
      })
  }, [])
  // ✅ Play/Pause logic here
  useEffect(() => {
    const container = containerRef.current
    if (container) {
      const videoEls = container.querySelectorAll("video")
      videoEls.forEach((vid, i) => {
        if (i === currentIndex) {
          vid.play().catch(() => {})
        } else {
          vid.pause()
          vid.currentTime = 0
        }
      })
    }
  }, [currentIndex,videos])

  const handleLike = async (foodId) => {
    const response =await axios.post('http://localhost:8080/api/food/like',{foodId},{withCredentials:true})
    if(response.data.like){
      setIsLiked(true)
      setVideos((pre)=>
        
        pre.map((v)=>(v._id===foodId?{...v,likeCount:v.likeCount+1}:v))
      )}
      else{
        setIsLiked(false)
        setVideos((pre)=>

        
          pre.map((v)=>(v._id===foodId?{...v,likeCount:v.likeCount-1}:v))
        )
      }
    } 
  

    
    
  

  const handleSave =async  (foodId) => {
    
   const response= await axios.post("http://localhost:8080/api/food/save",{foodId},{withCredentials:true})
   
   if(response.data.isSave){
    setIsSaved(true)
   }
   else{
    setIsSaved(false)
   }
   
    }
  

  const handleComment = (videoId) => {
    console.log('Comment on video:', videoId)
  }

  return (
    <>
      <div className="home-container" ref={containerRef}>
        {videos.map((videoOne) => (
          <div key={videoOne._id} className="video-reel">
            {/* {setLikeCount(videoOne.likeCount)} */}
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
                <Link
                  to={'/food-partner/' + videoOne.foodPartner}
                  className="visit-store-btn"
                >
                  Visit Store
                </Link>
              </div>
            </div>

            <VideoCard
              video={videoOne}
               isLiked={isLiked}
              likeCount={videoOne.likeCount}
              onLike={handleLike}
              onSave={handleSave}
              isSaved={isSaved}
              onComment={handleComment}
            />
          </div>
        ))}
      </div>
      <BottomNavigation   />
    </>
  )
}

export default Home