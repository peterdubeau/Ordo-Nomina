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
            <p className='lobby-guide-info'>You can share the room code with your party or get a direct link in the sidebar.</p>
            <button style={{fontSize: "20px"}} onClick={() => props.close()}>Got it</button>
          </div>
      </div>
      </div>
    </div>
  </>)
}
