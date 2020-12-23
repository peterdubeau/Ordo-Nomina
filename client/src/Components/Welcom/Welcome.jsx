import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './Welcome.css'

export default function Welcome(props) {
  const [check, setCheck] = useState(true)

  const handleCheck = () => {
    setCheck(!check)
    console.log(check)
  }
  
  const handleSubmit = () => {
    props.first()
    if (check) {
      console.log("no cookie")
    } else {
      console.log('First time stored')
      localStorage.setItem('returnUser', true)
    }
  }

  return (
    <div className='welcome-aura'>
      <div className='welcome-container'>
        <div className="welcome-body">
          <h2>Welcome to Ordo Nomina</h2>
          <p>It looks like this is your first time here.</p>
          <p>I suggest checking out the <Link className='welcome-link' to={''}>video tutorial </Link>before getting get started.</p>
          <p>You can also checkout the <Link className='welcome-link' to='/faq'>FAQ</Link> in the nav bar</p>
          <div className='welcome-checkbox'>
          <input
              type='checkbox'
              onClick={handleCheck}
          />
            <p>Don't show this message again</p>
          </div>
          <button onClick={handleSubmit}>Ok, got it.</button>
        </div>
      </div>
    </div>
  )
}
