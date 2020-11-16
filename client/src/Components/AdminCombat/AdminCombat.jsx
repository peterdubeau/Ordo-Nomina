import React from 'react'
import { Link } from 'react-router-dom'
import GameWebSocket from '../GameWebSocket/GameWebSocket'
import { takeTurn, destroyGame, removeCombatants } from '../../services/games'
import '../PlayerCombat/PlayerCombat.css'

export default function AdminCombat(props) {

console.log(props.match.params.code)

  function handleTakeTurn(arr) {
    arr.combatants.push(arr.combatants.shift())
    takeTurn(game.code, arr)
    }
  const { game } = props.gameData
  const userMap = game.users?.reduce((map, user) => {
    map[user.id] = user;
    return map;
  }, {});

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
    <div>
      Room Code: {game.code}
      {game.combatants?.map(id => <p className="user-details" key={userMap[id].id}>

        {userMap[id].username} : {userMap[id].initiative}
        <button onClick={() => removeCombatant(userMap[id].id)}>ded</button>
      
      </p>)}
      <button onClick={() => handleTakeTurn(game)}>Next Turn</button>
    <Link to={'/'}>
        <button onClick={() => destroyGame(game.code)}>End Combat</button>
    </Link>  
    </div>
  </>)
}