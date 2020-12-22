import React, { useState, useRef } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Flipped, Flipper } from 'react-flip-toolkit'
import LongMenu from '../LongMenu/LongMenu'
import { readGame, postUser, deleteUser, sendCombatants, destroyGame } from '../../services/games'
import GameWebSocket from '../GameWebSocket/GameWebSocket'
import './AdminLobby.css'

export default function AdminLobby(props) {
  
    const baseUrl = process.env.NODE_ENV === 'production'
      ? `https://`
      : `http://`

    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);
  
    function copyToClipboard(e) {
      textAreaRef.current.select();
      document.execCommand('copy');
      // This is just personal preference.
      // I prefer to not show the whole text area selected.
      e.target.focus();
      setCopySuccess('Copied!');
    };

  let gameUrl = `${baseUrl}${window.location.host}/link/${props.match.params.code}`

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
    if (formData.username.trim().length === 0 || isNaN(formData.initiative) || formData.initiative.trim().length === 0) {
      if (formData.username.trim().length === 0 || formData.username === '') {
        setFormFilled({ ...formFilled, username: false })
        e.preventDefault()
      }
      if ( isNaN(formData.initiative) || formData.initiative === '') {
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

  function sendToLobby() {
    if (window.confirm("Are you sure you want leave this lobby? You'll have to create a new game")) {
      destroyGame(props.match.params.code)
      history.push(`/`)
      window.location.reload()
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
        <h2 style={{
          textAlign: "center",
          topMargin: "40px"
        }}>
          Something went Wrong. Please try agian.</h2>
      <button className='create-join'>
        <Link className='link-style' to="/create-room"> Create Combat</Link>
      </button>
      </>)
        
    } else {
  
      let code = props.match.params.code
      let list = props.gameData
      let combatants = props.userList(list)

      function startCombat() {
        if (window.confirm("Are you sure you want to start combat?")) {
          sendCombatants(code, combatants)
          history.push(`/combat/${code}/DM/${props.match.params.username}`)
        }
      }
      
      return (<>
      <div className='admin-lobby-container'>
        <GameWebSocket
          cableApp={props.cableApp}
          updateApp={props.updateApp}
          getGameData={props.getGameData}
          code={props.match.params.code}
          />
        
          <h3 className='room-code'>Room Code: {code}</h3>

        <Flipper key={"flipper-thing"} flipKey={props.gameData} spring={'wobble'}>
          {props.gameData.filter(status => status.is_admin === false).map((user, i) =>
            <Flipped key={user.id + " flip key"} flipId={user.id}>
              <div className='user-details' key={user.id}>
                <button className ="user-options" id="delete-user" onClick={() => deleteUser(user.id)}>X</button>
                <p className='username'>{user.username}</p>
                <div className='up-down-container'>
                  <p className="initiative">{user.initiative} </p>
                  {props.gameData.length < 3 ? "" :
                    <div className='up-down'>
                      <button className="user-options" id="move-up" onClick={() => props.arrange(i)}>↑</button>
                      <button className="user-options" id="move-down" onClick={() => props.arrangeDown(i)}>↓</button>
                    </div>
                  }
                </div>
              </div>
           </Flipped>
            )}
        </Flipper>
        <label className='combatant-container'>
          <input
              className={formFilled.username ? 'combatant-info' : 'combatant-info-empty'}
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              maxLength= "20"
              placeholder={formFilled.username ? "Enemy Name" : "Enter Enemy Name"}
              />
          <input
              className={formFilled.initiative ? 'combatant-info' : 'combatant-info-empty'}
              name="initiative"
              type="text"
              value={formData.initiative}
              maxLength="3"
              onChange={handleChange}
              placeholder={formFilled.initiative ? "Initiative" : "Enter initiative"}
              />
        </label>
        <div className='lobby-buttons'>
          <button className = "add-start-order" onClick={handleSubmit}>Add Enemy</button>
        </div>
        <div className='menu'>
            
            <LongMenu
              className='menu'
              gameData={props.gameData}
              sort={props.sort}
              start={startCombat}
              copy={copyToClipboard}
              exit={sendToLobby}
              code={textAreaRef}
              url={gameUrl}
            />
        </div>   
      <h2>{props.match.params.username}'s game!</h2>
      </div>
      </>)
    }
    
  }

