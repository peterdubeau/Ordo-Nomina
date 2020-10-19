import React from 'react'
import { sendCombatants } from '../../services/games'
import GameWebSocket from '../GameWebSocket/GameWebSocket'

export default function AdminView(props) {


  let makeArray = (data) => {
    let players = []
    console.log(data)
    data.forEach(user => {
      if (user.is_admin === false) {
        players.push(user.username)
      } else {
        console.log(`admin is ${user.username}`)
      }
    })
    return players
  }
  
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
  
    let code = props.match.params.code
    let list = props.gameData
    let combatants = makeArray(list)

    

    console.log(combatants)
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
          <button onClick={() => sendCombatants(code, combatants)}>Send List</button>
        </>)
      }

}

