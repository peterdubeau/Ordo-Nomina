// import React from 'react'
// import { Link } from 'react-router-dom'
// import './CreateUser.css'

// export default function CreateUser(props) {

//   const [formData, setFormData] = useState({
//     username: "",
//     isAdmin: false,
//     code: ''
//   })

//   const handleChange = (e) => {
//     e.preventDefault()
//     const { value } = e.target
//     setFormData({
//       username: value,
//       isAdmin: false
//     })
//   }

//   const handleSubmit = async () => {
//     const newTask = await postTask({ code: props.code })
  
//     const findId = await getTasks()
//     let roomId = findId.filter(id => id.code === props.code)[0].id
//     const newHooks = await createHooks({ task_id: roomId })
//     const addUser = await postUser({
//       username: formData.username,
//       task_id: roomId,
//       is_admin: props.admin,
//       on_hook_id: newHooks.id
//     })
//   }

//   return (<div className="create-user">
//     <form>
//     <label >
//       <input 
//           name="username"
//           type="text"
//           name="username"
//           value={formData.username}
//           onChange={handleChange}
//           placeholder = "Username"
//       />
//     </label>
//         <Link to={`/tasks/${props.code}/users/${formData.username}`}>
//           <button onClick={handleSubmit}>Enter Room</button>
//         </Link>
//     </form>
//   </div>)
// }