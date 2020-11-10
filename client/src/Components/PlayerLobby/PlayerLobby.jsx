import React from 'react'
import GameWebSocket from '../GameWebSocket/GameWebSocket'
import {Redirect} from 'react-router-dom'

export default function PlayerLobby(props) {

  let host = props.gameData.users.filter(host => host.is_admin === true)
  const hostDetails = host.map(hostName => hostName.username)
  
  let list = props.gameData.users.sort(function(a,b){
    return b.initiative - a.initiative
    })
    
  if (props.startGame) {
    return <Redirect to={`/combat/${props.match.params.code}/player/${props.match.params.username}`} />
  }
        return (<>
          <GameWebSocket
          cableApp={props.cableApp}
          updateApp={props.updateApp}
          getGameData={props.getGameData}
          code={props.match.params.code}
          />
          user view
        <h2>{hostDetails}'s game</h2>
        {list.filter(status => status.is_admin === false).map(user => 
          <p key={user.username}>{user.username} : {user.initiative}</p>
          )}
        </>)
  
      }


