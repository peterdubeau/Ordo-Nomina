import React from 'react'
import { Link } from "react-router-dom"
import './Contact.css'

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
      "url": "https://linkedin.com/in/peterdubeau/"
    }
  ]



  return (
    <div className='contact-container'>
      <h1>Contact Me</h1>
      {details.map(page =>         
        <p className='pages'>
          <Link
            className='page-links'
            to={{ pathname: `${page.url}` }}
            target="_blank"
          >
            {page.title}
          </Link>
        </p>
      )
      }
    </div>
  )
}
