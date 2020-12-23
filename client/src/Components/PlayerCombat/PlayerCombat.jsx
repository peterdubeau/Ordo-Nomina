import React from 'react'
import { Redirect } from 'react-router-dom'
import GameWebSocket from '../GameWebSocket/GameWebSocket'
import Ding from '../../sounds/Ding-sound-effect.mp3'
import { removeCombatants } from '../../services/games'
import { Flipped, Flipper } from 'react-flip-toolkit'
import '../AdminCombat/AdminCombat.css' 

export default function playerCombat(props) {
  const { game } = props.gameData
  const userMap = game.users?.reduce((map, user) => {
    map[user.id] = user;
    return map;
  }, {});

  
  let onDeck = props.gameData.users.filter(id => id.id === props.gameData.combatants[1])
  let onDeckName = onDeck[0]?.username
  
  function onDeckAlert() {
    const audio = new Audio(Ding)
    // audio.play()
  }
  
  if (onDeckName === props.match.params.username) {
    onDeckAlert()
  }
  
  if (props.end === false) {
    alert("The DM has ended combat")
    return <Redirect to='/' />
  }

  if (props.end === 'lobby') {
    alert("The DM has ended combat")
    return <Redirect to={`/link/${props.match.params.code}`} />
  }
  
  if (props.gameData?.combatants === undefined) {
    return <Redirect to='/' />
  }
  
  function removeCombatant(id) {
    game.combatants.splice(game.combatants?.indexOf(id), 1)
    removeCombatants(props.match.params.code, game.combatants)
  }

  const leaveGame = (id) => {
    if (window.confirm("Are you sure? This will delete your character and remove you from combat")) {
      removeCombatant(id)
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
      
    <h3>"Loading game..."</h3>
    
    </>)
  }
  
  return (<>
    <div className='combat-container'>
    <GameWebSocket
      cableApp={props.cableApp}
      updateApp={props.updateApp}
      getGameData={props.getGameData}
      code={props.match.params.code}
      />
      <div className="code-container">
          <img 
            style={{height: '50px'}}
          src='https://res.cloudinary.com/dyrvlnond/image/upload/v1608509018/Tracker/Artboard_1_llwk43.png' />
        <h3 className='room-code'>
          Code: {props.match.params.code}</h3>
        </div>
        <div className="user-details-player">
    <Flipper flipKey={props.gameData} spring={'wobble'}>
      <div className='user-list'>
        {game.combatants?.map(id =>
            <Flipped key={userMap[id].id + `flipped guy`} flipId={userMap[id].id}>
            <div className="user-details" key={userMap[id].id}>
          {(userMap[id].username === props.match.params.username ? 
                <button className='delete-user-combat' onClick={() => leaveGame(userMap[id].id)}>
                  X
                </button>
                :
              <span></span>)}
              <span className="user-name">{userMap[id].username}</span>
                <span></span>
          </div>

          </Flipped >
        )}
        </div>
      </Flipper>
        </div>
    </div>
  </>)
}