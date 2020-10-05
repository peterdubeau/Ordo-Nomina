import React from 'react';
import { Route } from 'react-router-dom'
import CreateRoom from './Components/CreateRoom/CreateRoom'
import JoinRoom from './Components/JoinRoom/JoinRoom'
import Main from './Components/Main/Main'
import './App.css';


export default function App (props) {
 
  const generateCode = () => {
    let code = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const charLength = characters.length
    for (let i = 0; i < charLength; i++) {
      code += characters.charAt(Math.floor(Math.random() * charLength))
    }
    return code.slice(0, 5)
  }
  
  let roomCode = generateCode()
  console.log(props.cableApp)
  
  return (

      <div className="App">
        <Route path='/' exact>
          <CreateRoom code={roomCode}/>
        </Route>

        <Route path='/join-room'>
         <JoinRoom />
        </Route>
      
        <Route exact path='/game/:code/user/:username'>
          <Main cableApp={props.cableApp}/>
        </Route>

        
      </div>
    );
  }


