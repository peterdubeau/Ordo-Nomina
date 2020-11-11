import React from 'react'
import { Redirect } from 'react-router-dom'
import GameWebSocket from '../GameWebSocket/GameWebSocket'
import Ding from '../../sounds/Ding-sound-effect.mp3'
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
    audio.play()
  }

  if (onDeckName === props.match.params.username) {
    onDeckAlert()
  }

  if (props.gameData.combatants === undefined) {
    return <Redirect to={`/`} />
  }

  return (<>
    <GameWebSocket
      cableApp={props.cableApp}
      updateApp={props.updateApp}
      getGameData={props.getGameData}
      code={props.match.params.code}
    />
    <div>
      {game.combatants?.map(id => <p className="user-details"key={userMap[id].id}>{userMap[id].username}: {userMap[id].initiative}</p>)}
    </div>
  </>)
}