import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { postGame, postUser, readGame } from '../../services/games'
import './CreateRoom.css'


function CreateRoom(props) {
  const [formData, setFormData] = useState({
    username: "",
  })

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const handleChange = (e) => {
    e.persist()
    setFormData(formData => ({ ...formData, [e.target.name]: e.target.value }))
  }

  const history = useHistory();

  const handleSubmit = async () => {
    if (formData.username === '') {
      alert('Please enter Host name')
    } else {
      try {
        setIsLoading(true)
        await postGame({ code: props.code });
        let roomId = await readGame(props.code);
        await postUser({
          username: formData.username,
          initiative: 10000,
          game_id: roomId.id,
          is_admin: true
        });
        history.push(`/game/${props.code}/DM/${formData.username}`);
      } catch (error) {
        setError(error)
      }
    }
  }

  if (error) {
    return "Something Went Wrong"
  }

  return (<div >
    <form className="create-user">
      <label >
        <input
          className='user-input'
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Host Name"
        />
      </label>
        <button disabled={isLoading} onClick={handleSubmit}>
          {isLoading ? "Loading..." : "Enter Room"}
        </button>
    </form>
  </div>)
}

export default CreateRoom