
import './VideoCard.css'
import { RiBookmarkLine, RiChat3Line,RiBookmarkFill} from "react-icons/ri";


function VideoCard({ video, onLike, onSave, onComment,likeCount,isLiked,isSaved }) {
  // const [likes, setLikes] = useState(video.likes || 0)
  // const [saves, setSaves] = useState(video.saves || 0)
  // const [comments, setComments] = useState(video.comments || 0)
  // const [isLiked, setIsLiked] = useState(false)
 


  // const handleLike = () => {
  //   setIsLiked(!isLiked)
  //   setLikes(isLiked ? likes - 1 : likes + 1)
  //   onLike && onLike(video._id, !isLiked)
  // }

  // const handleSave = () => {
  //   setIsSaved(!isSaved)
  //   setSaves(isSaved ? saves - 1 : saves + 1)
  //   onSave && onSave(video._id, !isSaved)
  // }

  // const handleComment = () => {
  //   onComment && onComment(video._id)
  // }

  return (
    <div className="video-actions">
      <div className={`action-item }`} onClick={()=>onLike(video._id)}>
        <span className="icon">{isLiked ? '♥' : '♡'}</span>
        <span className="count">{likeCount}</span>
      </div>
      <div className={`action-item }`} onClick={()=>onComment}>
        <span className="icon"><RiChat3Line /></span>
        <span className="count"></span>
      </div>
      <div className="action-item" onClick={()=>onSave(video._id)}>
        <span className="icon">{isSaved?<RiBookmarkFill />:<RiBookmarkLine />}</span>
        
      </div>
    </div>
  )
}

export default VideoCard
