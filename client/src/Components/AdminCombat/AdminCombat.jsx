import React from 'react'
import GameWebSocket from '../GameWebSocket/GameWebSocket'

export default function AdminCombat(props) {

  let dude = props.gameData.game.combatants
  let list = new Object(dude)


  
  return (<>
      <GameWebSocket
          cableApp={props.cableApp}
          updateApp={props.updateApp}
          getGameData={props.getGameData}
          code={props.match.params.code}
        />
    <div>
      {props.gameData.game.combatants}
      {/* {props.gameData.game.combatants.map(combatant => <p>{combatant}</p>)} */}
    </div>
  </>)
}
