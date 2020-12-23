import React from 'react'
import ReactPlayer from 'react-player/lazy'
import './Tutorial.css'

export default function Tutorial(props) {
  return (
    <div className='tutorial-aura'>
      <div className='tutorial-container'>
        <div className='tutorial-body'>
          <ReactPlayer
            url='https://www.youtube.com/watch?v=odhMmAPDc54'
            width='80%'
            controls='true'
          />
          <p onClick={props.show} >Close</p>
        </div>
      </div>
    </div>
  )
}
