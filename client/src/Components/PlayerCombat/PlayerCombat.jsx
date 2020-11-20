import React from 'react'
import { Redirect } from 'react-router-dom'
import GameWebSocket from '../GameWebSocket/GameWebSocket'
import Ding from '../../sounds/Ding-sound-effect.mp3'
import { removeCombatants } from '../../services/games'
import { Flipped, Flipper } from 'react-flip-toolkit'
import './PlayerCombat.css' 

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
  
  function removeCombatant(id) {
    game.combatants.splice(game.combatants?.indexOf(id), 1)
    removeCombatants(props.match.params.code, game.combatants)
  }
  
  
  return (<>
    <GameWebSocket
      cableApp={props.cableApp}
      updateApp={props.updateApp}
      getGameData={props.getGameData}
      code={props.match.params.code}
    />
    <Flipper flipKey={props.gameData} spring={'wobble'}>
        {game.combatants?.map(id =>
            <Flipped key={userMap[id].id + `flipped guy`} flipId={userMap[id].id}>
          <p className="user-details" key={userMap[id].id}>
        
          {(userMap[id].username === props.match.params.username ? 
                <button id='delete' onClick={() => removeCombatant(userMap[id].id)}>X</button>
                :
                '')} {userMap[id].username}: {userMap[id].initiative} 
      
            </p>
          </Flipped >
        )}
    </Flipper>
  </>)
}