import React, { useState } from 'react';
import { Route } from 'react-router-dom'
import CreateRoom from './Components/CreateRoom/CreateRoom'
import JoinRoom from './Components/JoinRoom/JoinRoom'
import Main from './Components/Main/Main'
import Home from './Components/Home/Home'
import './App.css';


export default function App (props) {
 
  const [ permit, setPermit ] = useState()

  Notification.requestPermission().then(function(result) {
    console.log(result);
  });

  function askNotificationPermission() {
    // function to actually ask the permissions
    function handlePermission(permission) {
      // Whatever the user answers, we make sure Chrome stores the information
      if(!('permission' in Notification)) {
        Notification.permission = permission;
      }
  
      // set the button to shown or hidden, depending on what the user answers
      if(Notification.permission === 'denied' || Notification.permission === 'default') {
        setPermit({display: 'block'});
      } else {
        setPermit({display: 'none'});
      }
    }
  
    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
      console.log("This browser does not support notifications.");
    } else {
      if(checkNotificationPromise()) {
        Notification.requestPermission()
        .then((permission) => {
          handlePermission(permission);
        })
      } else {
        Notification.requestPermission(function(permission) {
          handlePermission(permission);
        });
      }
    }
  }

  function checkNotificationPromise() {
    try {
      Notification.requestPermission().then();
    } catch(e) {
      return false;
    }

    return true;
  }


  var img = '/to-do-notifications/img/icon-128.png';
  var text = `HEY! You're on deck!!`
  var notification = new Notification('To do list', { body: text, icon: img });

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
  
  return (

    <div className="App">
      
      <Route path='/' exact>
        <Home />
      </Route>

        <Route path='/create-room' exact>
          <CreateRoom code={roomCode}/>
        </Route>

        <Route path='/join-room'>
        <JoinRoom cableApp={props.cableApp}/>
        </Route>
      
        <Route>
          <Main cableApp={props.cableApp}/>
        </Route>

      <button id="enable"
        onClick={askNotificationPermission}
        style={permit}
      >
        Enable notifications
        </button>
        
      </div>
    );
  }


