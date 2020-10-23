import React from 'react'
import GameWebSocket from '../GameWebSocket/GameWebSocket'
import { takeTurn } from '../../services/games'

export default function AdminCombat(props) {
  
  console.log(props.code)
  const { game } = props.gameData
  const userMap = game.users?.reduce((map, user) => {
    map[user.id] = user;
    return map;
  }, {});



  return (<>
    <GameWebSocket
      cableApp={props.cableApp}
      updateApp={props.updateApp}
      getGameData={props.getGameData}
      code={props.match.params.code}
    />
    <div>
      {game.combatants?.map(id => <p key={userMap[id].id}>{userMap[id].username}: {userMap[id].id}</p>)}
      <button onClick={() => takeTurn(props.code)}> TOP DUDE OFF</button>
    </div>
  </>)
}