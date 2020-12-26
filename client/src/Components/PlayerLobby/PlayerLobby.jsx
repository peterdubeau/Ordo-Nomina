import React from 'react'
import {useHistory} from 'react-router-dom'
import GameWebSocket from '../GameWebSocket/GameWebSocket'
import { deleteUser } from '../../services/games'
import { Redirect, Link } from 'react-router-dom'
import './PlayerLobby.css'

export default function PlayerLobby(props) {

  const history = useHistory()
  sessionStorage.setItem('gameStatus', 'combat')
  sessionStorage.setItem('lastUrl', `${window.location.pathname}`)
  
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

  if (props.startGame === false) {
    return <Redirect to={'/'} />
  }

  let test = props.gameData.users?.filter(current => current.username === props.match.params.username)
  
  let checkForUser = async () => {
    await test 
    if (test.length == 0) {
      return <Redirect to={`/link/${props.match.params.code}`} />
    }
  }

  

  if (props.gameData.users?.length === 0) {
    return (<>
      <GameWebSocket
    cableApp={props.cableApp}
    updateApp={props.updateApp}
    getGameData={props.getGameData}
    code={props.match.params.code}
      />
      
    <h2 style={{
      textAlign: "center",
      marginTop: "40px"
        }}>Loading game...</h2>
    
    </>)
  }
  checkForUser().then(response => {
    if (response == undefined) {
      console.log("found")
    } else {
      history.push(`/link/${props.match.params.code}`)
    }
  })
    return (<>
      
      <div className="code-container">
          <img 
            style={{height: '50px'}}
          src='https://res.cloudinary.com/dyrvlnond/image/upload/v1608509018/Tracker/Artboard_1_llwk43.png' />
        <h3 className='room-code'>
          Code: {props.match.params.code}</h3>
        </div>
      <div className='player-lobby-container'>
        <h2>{hostDetails}'s game</h2>
        {list.filter(status => status.is_admin === false).map(user =>
          <div key={user.id} className='player-lobby-details'>
            {(user.username === props.match.params.username ?
                <button id='delete-self' onClick={() => deleteUser(userId)}>X</button>
              :
              "")} <p className='user-text' key={`info ${user.id}`}>{user.username} : <span>{user.initiative}</span> </p>
          </div>
        )}
      </div>
    </>)
  
}
