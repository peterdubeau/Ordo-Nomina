import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { postUser, readGame } from '../../services/games'
import '../CreateRoom/CreateRoom.css'

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

  function handleEnterRoom(e) {
    if (formData.username == '' || formData.initiative === '' || formData.code === '') {
      alert('Please fill out all character info')
      e.preventDefault()
    } else {
      handleSubmit()
      history.push(`/game/${formData.code.toUpperCase()}/user/${formData.username}`)
      e.preventDefault()
    }
  }
  
    return (
      <div>
        <form className='create-user'>
          <label >
            <input 
                className='user-input'
                name="code"
                type="text"
                value={formData.code.toUpperCase()}
                onChange={handleChange}
                placeholder = "Game Code"
            />
              <input 
                  className='user-input'
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder = "Character Name"
              />
              <input 
                  className='user-input'
                  name="initiative"
                  type="text"
                  value={formData.initiative}
                  onChange={handleChange}
                  placeholder = "Initiative"
              />
          </label>
          <button onClick={handleEnterRoom}>Enter Room</button>
        </form>
      </div>
    )
  }

