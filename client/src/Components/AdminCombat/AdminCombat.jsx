import React from 'react'
import { Link } from 'react-router-dom'
import GameWebSocket from '../GameWebSocket/GameWebSocket'
import { Flipped, Flipper } from 'react-flip-toolkit'
import { takeTurn, destroyGame, removeCombatants } from '../../services/games'
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
    <Flipper key={"flipper-thing"} flipKey={props.gameData} spring={'wobble'}>
      Room Code: {game.code}
      
      {game.combatants?.map(id =>
        <Flipped key={userMap[id].id + `flipped guy`} flipId={userMap[id].id}>
          <p className="user-details" key={userMap[id].id}>
            {userMap[id].username} : {userMap[id].initiative}
            <button onClick={() => removeCombatant(userMap[id].id)}>Remove</button>
          
          </p>
        </Flipped>)}
        <button onClick={() => handleTakeTurn(game)}>Next Turn</button>
      <Link to={'/'}>
          <button onClick={() => destroyGame(game.code)}>End Combat</button>
      </Link>  
    </Flipper>
  </>)
}