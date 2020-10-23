import React from 'react'
import GameWebSocket from '../GameWebSocket/GameWebSocket'

export default function AdminCombat(props) {
  
  
  const { game } = props.gameData
  const userMap = game.users?.reduce((map, user) => {
    map[user.id] = user;
    return map;
  }, {});

  console.log(props.gameData)
  // [1, 4, 200].reduce((accumulator, number) => accumulator + number, 0)
  
  // let orderedUsers = game.combatants?.map(id => userMap[id].username);


  return (<>
    <GameWebSocket
      cableApp={props.cableApp}
      updateApp={props.updateApp}
      getGameData={props.getGameData}
      code={props.match.params.code}
    />
    <div>
      {game.combatants?.map(id => <p key={userMap[id].id}>{userMap[id].username}: {userMap[id].id}</p>)}
      <button onClick={() => props.turn(game.combatants)}> TOP DUDE OFF</button>
    </div>
  </>)
}