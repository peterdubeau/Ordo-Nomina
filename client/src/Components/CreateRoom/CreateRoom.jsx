import React, { useState } from 'react'
import Logo from '../Logo/Logo'
import { useHistory } from 'react-router-dom'
import { postGame, postUser, readGame } from '../../services/games'
import './CreateRoom.css'


function CreateRoom(props) {
  const [formData, setFormData] = useState({
    username: "",
  })

  const [formFilled, setFormFilled] = useState(true)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const handleChange = (e) => {
    e.persist()
    setFormData(formData => ({ ...formData, [e.target.name]: e.target.value }))
  }

  const history = useHistory();

  const handleSubmit = async (e) => {
    if (formData.username.trim().length === 0) {
      setFormFilled(false)
      e.preventDefault()
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

  const noInfo = {
    color: "red"
  }

  if (error) {
    return "Something Went Wrong"
  }

  return (<div >
      <Logo />
    <form className="create-user">
      <label className='enter-label'>
        <input
          className={formFilled ? "user-input" : "user-input-empty"}
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder={formFilled ? "Host Name" : "Enter Host Name"}
        />
      </label>
      {formFilled ? '' : <span style={noInfo}>Please enter username</span>}
        <button disabled={isLoading} onClick={handleSubmit}>
          {isLoading ? "Loading..." : "Enter Room"}
        </button>
    </form>
  </div>)
}

export default CreateRoom