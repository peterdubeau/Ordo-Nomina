import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getGames, postUser, deleteUser, sendCombatants } from '../../services/games'
import GameWebSocket from '../GameWebSocket/GameWebSocket'

export default function AdminLobby(props) {
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    initiative: "",
    code: '',
    is_admin: false
  })

  const handleSubmit = async () => {
    const findId = await getGames()
    let roomId = findId.filter(id => id.code === props.match.params.code)[0].id
    await postUser({
      username: formData.username,
      game_id: roomId,
      initiative: formData.initiative,
      is_admin: false
    })
  }

    const handleChange = (e) => {
      e.persist()
      setFormData(formData => ({ ...formData, [e.target.name]: e.target.value }))
    }
  
    if (!props.gameData) {
      setTimeout(function () {
        window.location.reload(1);
      }, 500);
    
      
      return (<>
        <GameWebSocket
          cableApp={props.cableApp}
          updateApp={props.updateApp}
          getGameData={props.getGameData}
          code={props.match.params.code}
        />
      "loading game..."
      </>)
        
    } else {
  
      let code = props.match.params.code
      let list = props.gameData
      let combatants = props.userList(list)
      let id = props.gameData.filter(status => status.is_admin === true).map(user => user.game_id)


      return (<>
        <GameWebSocket
          cableApp={props.cableApp}
          updateApp={props.updateApp}
          getGameData={props.getGameData}
          code={props.match.params.code}
        />
          admin view
        <h2>{props.match.params.username}'s game!</h2>
        {props.gameData.filter(status => status.is_admin === false).map((user, i) =>
          <p key={user.id}>
              {user.id} -=-=-=- {user.username} : {user.initiative} 
              <button onClick={() => props.arrange(i)}> move up </button> 
              <button onClick={() => deleteUser(user.id)}>Remove user</button>
              {user.game_id}
            </p>
        )}
        <Link>
          <button onClick={() => sendCombatants(code, combatants)}>Start Combat</button>
        </Link>  
        <label >
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <input
            name="initiative"
            type="text"
            value={formData.initiative}
            onChange={handleChange}
            placeholder="initiative"
          />
        </label>
        <button onClick={handleSubmit}>Add Enemy</button>
        <button onClick={() => props.sort()}>Quick sort descending</button>
      </>)
    }

  }

