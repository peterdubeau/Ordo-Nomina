import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { postGame, getGames, postUser, readGame } from '../../services/games'
import './CreateRoom.css'


function CreateRoom(props) {
  const [formData, setFormData] = useState({
    username: "",
  })

  const handleChange = (e) => {
    e.persist()
    setFormData(formData => ({...formData, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async () => {
    await postGame({ code: props.code })

    let roomId = await readGame(props.code)
    await postUser({
      username: formData.username,
      initiative: 10000,
      game_id: roomId.id,
      is_admin: true
    })
  }

  return (<div className="create-user">
    <form className='host-name'>
    <label>
        <input 
          className='username-input'
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder = "Host Name"
        />
    </label>
        <Link to={`/game/${props.code}/DM/${formData.username}`}>
          <button onClick={handleSubmit}>Enter Room</button>
        </Link>
    </form>
  </div>)
}

export default CreateRoom