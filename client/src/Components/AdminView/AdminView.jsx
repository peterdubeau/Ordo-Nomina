import React from 'react'
import { sendCombatants} from '../../services/games'
import GameWebSocket from '../GameWebSocket/GameWebSocket'

export default function AdminView(props) {

  
  if (!props.gameData) {
    setTimeout(function () {
      window.location.reload(1);
    }, 500);
    
      
    return (<>
      <GameWebSocket
      cableApp={props.cableApp}
      updateApp={props.updateApp}
      getGameData={props.getGameData}
      code={props.match.params.code}
      />
      "loading game..."
    </>)
        
  } else {
  
    let list = props.gameData

        return (<>
          <GameWebSocket
          cableApp={props.cableApp}
          updateApp={props.updateApp}
          getGameData={props.getGameData}
          code={props.match.params.code}
          />
          admin view
          <h2>{props.match.params.username}'s game!</h2>
        {props.gameData.filter(status => status.is_admin === false).map((user, i) => 
          <p key={user.username}>{user.id} -=-=-=- {user.username} : {user.initiative} ---------- {user.game_id} <button onClick={() => props.arrange(i)}> move up </button> </p>
          )}
          <button onClick={() => sendList(props.match.params.code, list )}>Send List</button>
        </>)
      }

}

