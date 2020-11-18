import React  from 'react'
import GameWebSocket from '../GameWebSocket/GameWebSocket'
import { deleteUser } from '../../services/games'
import { Redirect, Link } from 'react-router-dom'
import '../PlayerCombat/PlayerCombat.css'

export default function PlayerLobby(props) {

  if (props.gameData?.game.status === 500) {
      alert("Game not found. Make sure you are using the correct code.")
      return <Redirect to='/' />
  }

  let host = props.gameData.users.filter(host => host.is_admin === true)
  const hostDetails = host.map(hostName => hostName.username)

  let currentUser = props.gameData.users.filter(user => user.username === props.match.params.username)
  let userId = currentUser[0]?.id

 
  let list = props.gameData.users.sort(function (a, b) {
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
          <p key={user.username}>

            {(user.username === props.match.params.username ?
              <Link to={'/join-room'}>
                <button id='delete' onClick={() => deleteUser(userId)}>X</button>
              </Link>
              :
              "" )} {user.username} : {user.initiative} 
          
          </p>
          )}
        </>)
  
      }


