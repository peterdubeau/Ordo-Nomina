import React from 'react'
import GameWebSocket from '../GameWebSocket/GameWebSocket'
// import { takeTurn } from '../../services/games'

export default function playerCombat(props) {
  
  
  const { game } = props.gameData
  const userMap = game.users?.reduce((map, user) => {
    map[user.id] = user;
    return map;
  }, {});


  console.log(game.combatants)
  return (<>
    <GameWebSocket
      cableApp={props.cableApp}
      updateApp={props.updateApp}
      getGameData={props.getGameData}
      code={props.match.params.code}
    />
    <div>
      {game.combatants?.map(id => <p key={userMap[id].id}>{userMap[id].username}: {userMap[id].id}</p>)}
    </div>
  </>)
}