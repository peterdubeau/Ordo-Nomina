import React from 'react'
import GameWebSocket from '../GameWebSocket/GameWebSocket'
import './PlayerCombat.css' 

export default function playerCombat(props) {
  
  
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
      {game.combatants?.map(id => <p className="user-details"key={userMap[id].id}>{userMap[id].username}: {userMap[id].initiative}</p>)}
    </div>
  </>)
}