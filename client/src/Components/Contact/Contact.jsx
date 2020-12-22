import React from 'react'
import { Link } from "react-router-dom"
import '../../App.css'

export default function Contact() {

  const details = [
    // {
    //   "title": "twitter",
    //   "url": "http://www..com"
    // },
    {
      "title": "GitHub",
      "url": "https://github.com/peterdubeau"
    },{
      "title": "Portfolio",
      "url": "http://petedubeau.surge.sh"
    }, {
      "title": "Email",
      "url": "mailto:spaceboatproduction@gmail.com"
    }, {
      "title": "LinkedIn",
      "url": "https://https://www.linkedin.com/in/peterdubeau/"
    }
  ]



  return (
    <div className>
      <h1>Contact Me</h1>
      {details.map(page => 
        
        <div className='user'>
        <p><Link to={{ pathname: `${page.url}` }} target="_blank">{page.title}</Link></p>
        </div>

      )
      }
    </div>
  )
}
