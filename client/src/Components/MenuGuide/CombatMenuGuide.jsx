import React from 'react'
import './MenuGuide.css'

export default function CombatMenuGuide(props) {
  return (<>
     <div className='circle-code'></div>
    {/* <div className='circle-menu'></div> */}
    <div className='lobby-guide-aura'>
      <div className="lobby-guide-container">
        <div className='lobby-guide-body'> 
          <div className="lobby-guide-info">
            <p className='lobby-guide-close' onClick={() => props.close()}>X</p>
            <p className='lobby-guide-info'>
              When combat is over you can use the <span style={{color: 'red'}}>End Combat</span> to
              send all players back to the Lobby, Or you can
            <span style={{ color: 'red' }}> End Game Session </span>
            which will delete this game along with all players.</p>
          </div>
      </div>
      </div>
    </div>
  </>)
}
