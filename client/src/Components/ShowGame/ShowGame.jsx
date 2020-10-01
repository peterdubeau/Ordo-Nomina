import React from 'react'
import GameWebSocket from '../GameWebSocket/GameWebSocket'

export default function ShowGame(props) {
  console.log(props.gameData)
  if (!props.gameData) {
    setTimeout(function () {
      window.location.reload(1);
    }, 500);
    return (<>
      "loading game..."
    </>)
    
  } else {

  
   let findHost = (users) => {
     let host = users.filter(host => host.is_admin === true)
      return host
   }
    
  

  return (<>
    <GameWebSocket
      cableApp={props.cableApp}
      updateApp={props.updateApp}
      getGameData={props.getGameData}
      code={props.match.params.code}
    />
    {props.gameData.filter(host => host.is_admin === true).map(hostName => <p>{hostName.username}'s Game:</p>)}
    {props.gameData.filter(status => status.is_admin == false).map(user => 
      <p>{user.id} -=-=-=- {user.username} : {user.initiative}</p>
    )}
  </>)
    
    
}
}
