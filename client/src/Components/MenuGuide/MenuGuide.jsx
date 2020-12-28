import React from 'react'
import './MenuGuide.css'

export default function MenuGuide(props) {
  return (<>
    <div className='circle-menu'></div>
    <div className='circle-code'></div>
    <div className='lobby-guide-aura'>
      <div className="lobby-guide-container">
        <div className='lobby-guide-body'> 
          <div className="lobby-guide-info">
            <p className='lobby-guide-close' onClick={() => props.close()}>X</p>
            <p className='lobby-guide-info'>You can share the room code with your party or get a direct link in the sidebar.</p>
          </div>
      </div>
      </div>
    </div>
  </>)
}
