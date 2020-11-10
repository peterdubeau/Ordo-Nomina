import React from 'react'
import { Link } from 'react-router-dom'
import GameWebSocket from '../GameWebSocket/GameWebSocket'
import { takeTurn, destroyGame } from '../../services/games'
import '../PlayerCombat/PlayerCombat.css'

export default function AdminCombat(props) {

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
      Room Code: {game.code}
      {game.combatants?.map(id => <p className="user-details" key={userMap[id].id}>{userMap[id].username} : {userMap[id].initiative} </p>)}
      <button onClick={() => handleTakeTurn(game)}>Next Turn</button>
    <Link to={'/'}>
        <button onClick={() => destroyGame(game.code)}>End Combat</button>
    </Link>  
    </div>
  </>)
}