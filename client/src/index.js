import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import actionCable from 'actioncable'
import { BrowserRouter as Router } from 'react-router-dom'


let CableApp = {}

const protocol = process.env.NODE_ENV === 'production' ? "wss:" : "ws:";
const host = window.location.host;
const port = window.location.port;
window.location.host

const baseUrl = process.env.NODE_ENV === 'production'
  ? "wss://live-initiative-tracker.herokuapp.com"
  : "ws://localhost:3000";

CableApp.cable = actionCable.createConsumer(`${baseUrl}/cable`)
console.log(baseUrl)
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
