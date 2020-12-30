import React from 'react'
import './MenuGuide.css'

export default function CombatMenuGuide(props) {
  return (<>
     <div className='circle-code'></div>
    {/* <div className='circle-menu'></div> */}
    <div className='lobby-guide-aura'>
      <div className="combat-guide-container">
        <div className='lobby-guide-body'> 
          <div className="combat-guide-info">
            <p className='combat-guide-close' onClick={() => props.close()}>X</p>
            <p className='combat-guide-info'>
              Clicking the <span id='delete-user'>X</span> next to a PC or enemies name will remove them from combat.<br /><br />
              When combat is over you can <span style={{ color: 'red' }}> End Combat </span> 
              to send all players back to the Lobby, Or you can
            <span style={{ color: 'red' }}> End Game Session </span>
            which will delete this game along with all players.</p>
          </div>
      </div>
      </div>
    </div>
  </>)
}
