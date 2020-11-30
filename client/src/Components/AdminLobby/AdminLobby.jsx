import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Flipped, Flipper } from 'react-flip-toolkit'
import { readGame, postUser, deleteUser, sendCombatants } from '../../services/games'
import GameWebSocket from '../GameWebSocket/GameWebSocket'
import './AdminLobby.css'

export default function AdminLobby(props) {
  
  const history = useHistory();
  
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    initiative: "",
    code: '',
    is_admin: false
  })

  const [formFilled, setFormFilled] = useState({
    username: true,
    initiative: true
  });
  
  const handleSubmit = async (e) => {
    if (formData.username.trim().length === 0 || formData.initiative.trim().length === 0 || typeof formData.initiative !== 'number') {
      if (formData.username.trim().length === 0) {
        setFormFilled({ ...formFilled, username: false })
        e.preventDefault()
      } if (formData.initiative.trim().length === 0) {
        setFormFilled({ ...formFilled, initiative: false })
        e.preventDefault()
      }
    } else {
      try {
        let roomId = await readGame(props.match.params.code)
        await postUser({
          username: formData.username,
          game_id: roomId.id,
          initiative: formData.initiative,
          is_admin: false
        })
        setFormData({
          id: "",
          username: "",
          initiative: "",
          code: roomId.id,
          is_admin: false
        })
        setFormFilled({
          username: true,
          initiative: true
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
  
  const handleChange = (e) => {
      setFormData(formData => ({ ...formData, [e.target.name]: e.target.value }))
      e.persist()
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

      function startCombat() {
        sendCombatants(code, combatants)
        history.push(`/combat/${code}/DM/${props.match.params.username}`)
      }

      return (<>
      <div className='admin-lobby-container'>
        <GameWebSocket
          cableApp={props.cableApp}
          updateApp={props.updateApp}
          getGameData={props.getGameData}
          code={props.match.params.code}
        />
        <h3>Room Code: {code}</h3>
        <h2>{props.match.params.username}'s game!</h2>
        <Flipper key={"flipper-thing"} flipKey={props.gameData} spring={'wobble'}>
          {/* <div className='user-details-container'> */}
          {props.gameData.filter(status => status.is_admin === false).map((user, i) =>
            <Flipped key={user.id + " flip key"} flipId={user.id}>
              <div className='user-details' key={user.id}>
                <button className ="user-options" id="delete-user" onClick={() => deleteUser(user.id)}>X</button>
                <p>{user.username} : {user.initiative} </p>
                <div className='up-down'>
                  <button className="user-options" id="move-up" onClick={() => props.arrange(i)}>↑</button> 
                  <button className="user-options" id="move-down" onClick={() => props.arrangeDown(i)}>↓</button>
                </div>
              </div>
           </Flipped>
            )}
          {/* </div> */}
        </Flipper>
        <label className='combatant-container'>
          <input
              className={formFilled.username ? 'combatant-info' : 'combatant-info-empty'}
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder={formFilled.username ? "Enemy Name" : "Enter Enemy Name"}
          />
          <input
              className={formFilled.initiative ? 'combatant-info' : 'combatant-info-empty'}
              name="initiative"
              type="text"
              value={formData.initiative}
              onChange={handleChange}
              placeholder={formFilled.initiative ? "Initiative" : "Enter initiative"}
          />
        </label>
        <div className='lobby-buttons'>
          <button className = "add-start-order" onClick={handleSubmit}>Add Enemy</button>
          <button className = "add-start-order" onClick={() => props.sort()}>Quick sort descending</button>
          <button className= "add-start-order" onClick={startCombat}>Start Combat</button>
        </div>
      </div>

      </>)
    }

  }

