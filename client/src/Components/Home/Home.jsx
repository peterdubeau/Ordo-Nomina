import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <Logo/>
      <button className='create-join'>
        <Link className='link-style' to="/create-room"> Create Combat</Link>
      </button>
      <button className='create-join'>
        <Link className='link-style' to="/join-room">Join Combat</Link>
      </button>
      
    </div>
  )
}
