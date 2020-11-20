import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Flipped, Flipper } from 'react-flip-toolkit'
import { getGames, postUser, deleteUser, sendCombatants } from '../../services/games'
import GameWebSocket from '../GameWebSocket/GameWebSocket'
import './AdminLobby.css'

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

      return (<>
      <div className='admin-lobby-container'>
        <GameWebSocket
          cableApp={props.cableApp}
          updateApp={props.updateApp}
          getGameData={props.getGameData}
          code={props.match.params.code}
        />
        <h2>{props.match.params.username}'s game!</h2>
        <h3>Room Code: {code}</h3>
        <Flipper key={"flipper-thing"} flipKey={props.gameData} spring={'wobble'}>
          <div className='user-details-container'>
          {props.gameData.filter(status => status.is_admin === false).map((user, i) =>
            <Flipped key={user.id + " flip key"} flipId={user.id}>
              <p className='user-details' key={user.id}>
                <button className ="user-options" id="delete" onClick={() => deleteUser(user.id)}>X</button>
                <p>{user.username} : {user.initiative} </p>
                <button className="user-options" id="move-up" onClick={() => props.arrange(i)}>↑</button> 
                <button className="user-options" id="move-down" onClick={() => props.arrangeDown(i)}>↓</button>
              </p>
           </Flipped>
            )}
          </div>
        </Flipper>
        <label className='combatant-container'>
          <input
            className='combatant-info'
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enemy Name"
          />
          <input
            className='combatant-info'
            name="initiative"
            type="text"
            value={formData.initiative}
            onChange={handleChange}
            placeholder="initiative"
          />
        </label>
        <div className='lobby-buttons'>
          <button className = "user-options" onClick={handleSubmit}>Add Enemy</button>
          <button className = "user-options" onClick={() => props.sort()}>Quick sort descending</button>

          <Link to={`/combat/${code}/DM/${props.match.params.username}`}>
            <button onClick={() => sendCombatants(code, combatants)}>Start Combat</button>
          </Link>
          </div>
      </div>
      </>)
    }

  }

