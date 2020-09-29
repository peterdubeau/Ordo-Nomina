import React from 'react'
import GameWebSocket from '../GameWebSocket/GameWebSocket'

export default function ShowGame(props) {
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

}
