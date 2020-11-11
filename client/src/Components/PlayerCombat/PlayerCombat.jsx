import React from 'react'
import { Redirect } from 'react-router-dom'
import GameWebSocket from '../GameWebSocket/GameWebSocket'
import './PlayerCombat.css' 

export default function playerCombat(props) {
  
  
  const { game } = props.gameData
  const userMap = game.users?.reduce((map, user) => {
    map[user.id] = user;
    return map;
  }, {});

  let onDeck = props.gameData.users.filter(id => id.id === props.gameData.combatants[1])
  let onDeckName = onDeck[0]?.username
  console.log(onDeckName === props.match.params.username)
 
  if (onDeckName === props.match.params.username) {
    
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