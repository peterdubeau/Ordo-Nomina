import React from 'react'
import GameWebSocket from '../GameWebSocket/GameWebSocket'

export default function ShowGame(props) {



  const getUsers = async () => {
  
  } 

  console.log(props.gameData)

  if (getUsers !== {}) {
    return (<>
      <GameWebSocket
        cableApp={props.cableApp}
        updateApp={props.updateApp}
        getGameData={props.getGameData}
        code={props.match.params.code}
      />
      {props.gameData.map(user => 
        <p>{user.id} ------ {user.username} : {user.initiative}</p>
      )}
    </>)
  } else {
    return 'Loading...'
  }
}
