import React from 'react'
import GameWebSocket from '../GameWebSocket/GameWebSocket'

export default function ShowGame(props) {
  let users = props.gameData.users
  console.log(users)
  return (<>
    <GameWebSocket
          cableApp={props.cableApp}
          updateApp={props.updateApp}
          getGameData={props.getGameData}
          code={props.match.params.code}
        />
    <div>
      {users.map(user =>
        <p>{user.username}</p>
      )}
    
    </div>
  </>)
}
