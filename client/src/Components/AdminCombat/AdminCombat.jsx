import React from 'react'
import GameWebSocket from '../GameWebSocket/GameWebSocket'
import { takeTurn } from '../../services/games'

export default function AdminCombat(props) {

  let handleTakeTurn = (arr) => {
    arr.combatants.push(arr.combatants.shift())
    takeTurn(props.code, arr)
  }
  
  const { game } = props.gameData
  const userMap = game.users?.reduce((map, user) => {
    map[user.id] = user;
    return map;
  }, {});
  
  // const orderedList = game.combatants?.map(id => userMap[id].username)

  return (<>
    <GameWebSocket
      cableApp={props.cableApp}
      updateApp={props.updateApp}
      getGameData={props.getGameData}
      code={props.match.params.code}
    />
    <div>
      {/* {orderedList} */}
      {game.combatants?.map(id => <p key={userMap[id].id}>{userMap[id].username} : {userMap[id].initiative} </p>)}
      <button onClick={() => handleTakeTurn(game)}> TOP DUDE OFF</button>
    </div>
  </>)
}