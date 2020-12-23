import React, { useState } from 'react';
import { Route } from 'react-router-dom'
import CreateRoom from './Components/CreateRoom/CreateRoom'
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary'
import JoinRoom from './Components/JoinRoom/JoinRoom'
import JoinLink from './Components/JoinLink/JoinLink'
import Main from './Components/Main/Main'
import Home from './Components/Home/Home'
import FAQ from './Components/FAQ/FAQ'
import Contact from './Components/Contact/Contact'
import LogoMini from './Components/Logo/LogoMini'
import Tutorial from './Components/Tutorial/Tutorial'
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
  
  const [showTutorial, setShowTutorial] = useState(false);
  const displayTutorial = () => {
    setShowTutorial(!showTutorial)
  }

  let roomCode = generateCode()
  
  return (

    <div className="App">
      <LogoMini show={displayTutorial}/>
      {showTutorial ? <Tutorial show={displayTutorial}/> : ''}

        <Route path='/' exact>
          <Home show={displayTutorial}/>
        </Route>

        <Route path='/create-room' exact>
          <CreateRoom code={roomCode}/>
        </Route>

        <Route path='/join-room'>
          <JoinRoom cableApp={props.cableApp}/>
        </Route>
      
      <ErrorBoundary>
        <Route>
          <Main cableApp={props.cableApp}/>
        </Route>
      </ErrorBoundary>
      
      <Route exact path='/link/:code'>
        <JoinLink />
      </Route>

      <Route exact path='/faq'>
        <FAQ />
      </Route>

      <Route exact path ='/contact'>
        <Contact />
      </Route>

        
      </div>
    );
  }


