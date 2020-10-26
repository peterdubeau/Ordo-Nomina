import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <Link to="/create-room">
        <button>Create Combat</button>
      </Link>
      <Link to='join-room'>
        <button>Join Combat</button>
      </Link>
      
    </div>
  )
}
