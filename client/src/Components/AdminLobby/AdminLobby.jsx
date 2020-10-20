import React, {useState} from 'react'
import { sendCombatants, getGames, postUser } from '../../services/games'
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
          <p key={user.username}>{user.id} -=-=-=- {user.username} : {user.initiative} ---------- {user.game_id} <button onClick={() => props.arrange(i)}> move up </button> </p>
        )}
        <button onClick={() => props.updateApp({ list, code: code, type: 'combatants' })}>Send List</button>
          
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
      </>)
    }

  }

