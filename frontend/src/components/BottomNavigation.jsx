import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import './BottomNavigation.css'
import { RiBookmarkFill } from "react-icons/ri";

function BottomNavigation() {
  const location = useLocation()

  return (
    <div className="bottom-navigation">
      <Link
        to="/"
        className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
      >
        <span className="nav-icon">⌂</span>
        <span className="nav-label">Home</span>
      </Link>
      <Link
        to="/saved"
        className={`nav-item ${location.pathname === '/saved' ? 'active' : ''}`}
      >
        <span className="nav-icon"><RiBookmarkFill /></span>
        <span className="nav-label">Saved</span>
      </Link>
    </div>
  )
}

export default BottomNavigation
