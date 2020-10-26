import React from 'react'
import GameWebSocket from '../GameWebSocket/GameWebSocket'
import { takeTurn } from '../../services/games'

export default function AdminCombat(props) {

  console.log(props.gameData)

  function handleTakeTurn(arr) {
    arr.combatants.push(arr.combatants.shift())
    takeTurn(game.code, arr)
    }
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
      {/* {orderedList} */}
      {game.combatants?.map(id => <p key={userMap[id].id}>{userMap[id].username} : {userMap[id].initiative} </p>)}
      <button onClick={() => handleTakeTurn(game)}>Next Turn</button>
    </div>
  </>)
}