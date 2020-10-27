import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <div>
      <h1>Live Tracker to be Named Later</h1>
      <Link to="/create-room">
        <button>Create Combat</button>
      </Link>
      <Link to='join-room'>
        <button>Join Combat</button>
      </Link>
      
    </div>
  )
}
