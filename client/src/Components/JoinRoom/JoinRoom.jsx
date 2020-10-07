import React, { useState } from 'react'
import { Link, Route } from 'react-router-dom'
import { getGames, postUser } from '../../services/games'
import Main from '../Main/Main'

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

  const handleSubmit = async () => {
    const findId = await getGames()
    let roomId = findId.filter(id => id.code === formData.code)[0].id
    await postUser({
      username: formData.username,
      game_id: roomId,
      initiative: formData.initiative,
      is_admin: false
    })
  }
  
    return (
      <div>
        <form>
        <label >
            <input 
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder = "Username"
            />
            <input 
                name="code"
                type="text"
                value={formData.code}
                onChange={handleChange}
                placeholder = "Game Code"
            />
            <input 
                name="initiative"
                type="text"
                value={formData.initiative}
                onChange={handleChange}
                placeholder = "initiative"
            />
    </label>
        <Link to={`/game/${formData.code}/user/${formData.username}`}>
          <button onClick={handleSubmit}>Enter Room</button>
        </Link>
        </form>
      </div>
    )
  }
