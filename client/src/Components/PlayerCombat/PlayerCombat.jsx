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
  
  if (props.gameData?.combatants === undefined) {
    return <Redirect to='/' />
  }
  
  function removeCombatant(id, e) {
    game.combatants.splice(game.combatants?.indexOf(id), 1)
    removeCombatants(props.match.params.code, game.combatants)
    e.preventDefault()
  }
  
  
  return (<>
    <div className='combat-container'>
    <GameWebSocket
      cableApp={props.cableApp}
      updateApp={props.updateApp}
      getGameData={props.getGameData}
      code={props.match.params.code}
    />
    <Flipper flipKey={props.gameData} spring={'wobble'}>
      <div className='user-list'>
        {game.combatants?.map(id =>
            <Flipped key={userMap[id].id + `flipped guy`} flipId={userMap[id].id}>
          <div className="user-details" key={userMap[id].id}>
          {(userMap[id].username === props.match.params.username ? 
                <button className='delete-user-combat' onClick={() => removeCombatant(userMap[id].id)}>X</button>
                :
              '')}
              <span></span><span className="left">{userMap[id].username}</span><span> </span>
          </div>

          </Flipped >
        )}
        </div>
      </Flipper>
    </div>
  </>)
}