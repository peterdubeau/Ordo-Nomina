import React, { useState } from 'react'
import { Link, Route } from 'react-router-dom'
import Main from '../Main/Main'
import { postGame, getGames, postUser} from '../../services/games'


function CreateRoom(props) {
  const [formData, setFormData] = useState({
    username: "",
  })

  // const handleChange = (e) => {
  //   e.preventDefault()
  //   const { name, value } = e.target
  //   setFormData({
  //     [name]: value,
  //     isAdmin: true
  //   })
  // }

  const handleChange = (e) => {
    e.persist()
    setFormData(formData => ({...formData, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async () => {
    await postGame({ code: props.code })
  
    const findId = await getGames()
    let roomId = findId.filter(id => id.code === props.code)[0].id
    await postUser({
      username: formData.username,
      initiative: 10000,
      game_id: roomId,
      is_admin: true
    })
  }

  return (<div className="create-user">
    <form>
    <label >
      <input 
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