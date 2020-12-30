import React from 'react'
import ReactPlayer from 'react-player'
import './Tutorial.css'

export default function Tutorial(props) {
  return (
    <div className='tutorial-aura'>
      <div className='tutorial-container'>
        <div className='tutorial-body'>
          <ReactPlayer
            url='youtube.com/watch?v=SlMLXjewQP8'
            width='80%'
            controls='true'
          />
          <p onClick={props.show} >Close</p>
        </div>
      </div>
    </div>
  )
}
