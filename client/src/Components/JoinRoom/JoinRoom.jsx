import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { postUser, readGame } from '../../services/games'

export default function JoinRoom() {
  
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    initiative: "",
    code: '',
    is_admin: false
  })
  
  
  const handleChange = (e) => {
    e.persist()
    setFormData(formData => ({...formData, [e.target.name]: e.target.value}))
  }

  const history = useHistory()

  const handleSubmit = async () => {
    let roomId = await readGame(formData.code.toUpperCase())
        await postUser({
          username: formData.username,
          game_id: roomId.id,
          initiative: formData.initiative,
          is_admin: false
      })
    }

  function handleEnterRoom(e){
    handleSubmit()
    history.push(`/game/${formData.code.toUpperCase()}/user/${formData.username}`)
    e.preventDefault()
  }
  
    return (
      <div>
        <form>
        <label >
          <input 
              name="code"
              type="text"
              value={formData.code.toUpperCase()}
              onChange={handleChange}
              placeholder = "Game Code"
          />
            <input 
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder = "Character Name"
            />
            <input 
                name="initiative"
                type="text"
                value={formData.initiative}
                onChange={handleChange}
                placeholder = "initiative"
            />
    </label>
          <button onClick={handleEnterRoom}>Enter Room</button>
        </form>
      </div>
    )
  }

