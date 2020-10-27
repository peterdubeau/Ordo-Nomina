import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import actionCable from 'actioncable'
import { BrowserRouter as Router } from 'react-router-dom'

let CableApp = {}

// CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')
CableApp.cable = actionCable.createConsumer('ws://live-initiative-tracker.herokuapp.com/cable')



ReactDOM.render(
  <Router>
    <App cableApp={CableApp}/>
  </Router>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
