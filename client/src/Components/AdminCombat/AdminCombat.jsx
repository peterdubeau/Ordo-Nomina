import React from 'react'
import GameWebSocket from '../GameWebSocket/GameWebSocket'

export default function AdminCombat(props) {

  let dude = props.gameData.game.combatants
  
  return (<>
      <GameWebSocket
          cableApp={props.cableApp}
          updateApp={props.updateApp}
          getGameData={props.getGameData}
          code={props.match.params.code}
        />
    <div>
    {dude}
      {/* {dude.map(combatant => <p>{combatant}</p>)} */}
    </div>
  </>)
}
