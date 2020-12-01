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
  
  const [formFilled, setFormFilled] = useState({
    username: true,
    initiative: true,
    code: true
  });
  
  const handleChange = (e) => {
    e.persist()
    setFormData(formData => ({ ...formData, [e.target.name]: e.target.value }))
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
    if (formData.username === '' || formData.initiative === '' || formData.code === '' ||  isNaN(formData.initiative)) {
      if (formData.username === '') {
        setFormFilled({ ...formFilled, username: false })
        e.preventDefault()
      } if (formData.code === '') {
        setFormFilled({ ...formFilled, code: false })
        e.preventDefault()
      } if (formData.initiative === '' || isNaN(formData.initiative)) {
        setFormFilled({ ...formFilled, initiative: false })
        e.preventDefault()
      }
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
              className={ formFilled.code ? 'user-input' : 'user-input-empty'}
                name="code"
                type="text"
                value={formData.code.toUpperCase()}
                onChange={handleChange}
                placeholder = { formFilled.code ? 'Game Code' : 'Enter Game Code'}
            />
              <input 
                  className={ formFilled.username ? 'user-input' : 'user-input-empty'}
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder = { formFilled.username ? 'Character Name' : 'Enter-name'}
              />
              <input 
                  className={ formFilled.initiative ? 'user-input' : 'user-input-empty'}
                  name="initiative"
                  type="text"
                  value={formData.initiative}
                  onChange={handleChange}
                  placeholder = { formFilled.initiative ? 'Initiative' : 'Enter initiative'}
              />
          </label>
          <button onClick={handleEnterRoom}>Enter Room</button>
        </form>
      </div>
    )
  }

