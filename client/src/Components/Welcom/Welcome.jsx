import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './Welcome.css'

export default function Welcome(props) {
  const [check, setCheck] = useState(true)

  const handleCheck = () => {
    setCheck(!check)
  }
  
  const handleSubmit = () => {
    props.first()
    if (!check) {
      localStorage.setItem('returnUser', true)
    }
  }

  const linkStyle = {color: 'white', fontWeight: 'bold', fontStyle: 'italic'}

  return (
    <div className='welcome-aura'>
      <div className='welcome-container'>
        <div className="welcome-body">
          <h2>Welcome to Ordo Nomina</h2>
          <p className='welcome-info'>It looks like this is your first time here.</p>
          <p className='welcome-info'>I suggest checking out 
          the <span
              onClick={props.show}
              className='links'
              style={linkStyle}
            >tutorial video</span> before getting started.</p>
          
            <p className='welcome-info'>You can also check out the
            <span
               style={linkStyle}
            ><Link className='welcome-link' to='/faq'> FAQ </Link></span> in the navigation menu</p>
          <div className='welcome-checkbox'>
            <input
                type='checkbox'
                onClick={handleCheck}
            />
              <p className="check-box">Don't show this message again</p>
          </div>
          <button onClick={handleSubmit}>Ok, got it.</button>
        </div>
      </div>
    </div>
  )
}
