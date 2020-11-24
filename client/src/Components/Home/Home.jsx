import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <h1>Live Tracker to be Named Later</h1>
      
      <button className='create-join'>
        <Link className='link-style' to="/create-room"> Create Combat</Link>
      </button>
      <button className='create-join'>
        <Link className='link-style' to="/join-room">Join Combat</Link>
      </button>
      
    </div>
  )
}
