import React, { useState } from 'react'
import GameWebSocket from '../GameWebSocket/GameWebSocket'
import { deleteUser } from '../../services/games'
import { Redirect, Link } from 'react-router-dom'
import './PlayerLobby.css'

export default function PlayerLobby(props) {

  const [isLoading, setIsLoading] = useState(true)

  
  let host = props.gameData.users.filter(host => host.is_admin === true)
  const hostDetails = host.map(hostName => hostName.username)
  
  let currentUser = props.gameData.users.filter(user => user.username === props.match.params.username)
  let userId = currentUser[0]?.id
  
  
  let list = props.gameData.users.sort(function (a, b) {
    return b.initiative - a.initiative
  })
  
  if (props.gameData?.game.status === 500) {
    alert("Game not found. Make sure you are using the correct code.")
    return <Redirect to='/' />
  }

  if (props.startGame === true) {
    return <Redirect to={`/combat/${props.match.params.code}/player/${props.match.params.username}`} />
  }

  if (props.gameData.users?.length === 0) {
    return (<>
      <GameWebSocket
    cableApp={props.cableApp}
    updateApp={props.updateApp}
    getGameData={props.getGameData}
    code={props.match.params.code}
      />
      
    <h3>"Loading game..."</h3>
    
    </>)
  }
  
    return (<>
      <div className='player-lobby-container'>
        <h2>{hostDetails}'s game</h2>
        {list.filter(status => status.is_admin === false).map(user =>
          <div key={user.id} className='player-lobby-details'>
            {(user.username === props.match.params.username ?
              <Link to={'/join-room'}>
                <button id='delete-self' onClick={() => deleteUser(userId)}>X</button>
              </Link>
              :
              "")} <p className='user-text' key={`info ${user.id}`}>{user.username} : {user.initiative} </p>
          </div>
        )}
      </div>
      
      <h3 className='room-code'>Room Code: {props.gameData.game.code}</h3>
    </>)
  
}
