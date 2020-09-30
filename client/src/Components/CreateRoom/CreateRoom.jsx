import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { postGame, getGames, postUser} from '../../services/games'


function CreateRoom(props) {
  const [formData, setFormData] = useState({
    username: "",
    initiative: "",
    isAdmin: true
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
    const newGame = await postGame({ code: props.code })
  
    const findId = await getGames()
    let roomId = findId.filter(id => id.code === props.code)[0].id
    const addUser = await postUser({
      username: formData.username,
      game_id: roomId,
      initiative: formData.initiative,
      is_admin: props.admin
    })
  }

  return (<div className="create-user">
    <form>
    <label >
      <input 
          name="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder = "Username"
        />
        <input
          name="initiative"
          type="text"
          name="initiative"
          value={formData.initiative}
          onChange={handleChange}
          placeholder = "Initiative"
        />
    </label>
        <Link to={`/game/${props.code}/users/`}>
          <button onClick={handleSubmit}>Enter Room</button>
        </Link>
    </form>
  </div>)
}

export default CreateRoom