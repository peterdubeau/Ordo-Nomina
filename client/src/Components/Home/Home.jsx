import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo'
import Welcome from '../Welcom/Welcome'
import './Home.css'

export default function Home() {

  let status = localStorage.getItem('returnUser')

  const [firstTime, setFirstTime] = useState(JSON.parse(status))
  
  const isFirstVisit = () => {
    setFirstTime(!firstTime)
  }
  
  return (<>
    <Logo />

    {firstTime ?  '' : <Welcome first={isFirstVisit} />  }
    
    <div className="home">
      <button className='create-join'>
        <Link className='link-style' to="/create-room"> Create Combat</Link>
      </button>
      <button className='create-join'>
        <Link className='link-style' to="/join-room">Join Combat</Link>
      </button>
      
    </div>
  </>)
}
