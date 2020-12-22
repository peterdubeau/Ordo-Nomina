import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import './ErrorBoundary.css'


export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  
  render() {
    function reset(){
      window.location.reload()
    }

    function home() {
      window.location.replace(`${window.location.protocol}//${window.location.host}`)
    }

console.log(window.location)
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (<div className="container">
        <h2 className ="message">Something went wrong. Refreshing might fix it</h2>
        <button classNAme="error" onClick={reset}>refresh</button>
        <br/><br/><br/>
        <p>If refreshing didn't work, you can head back to the home screen. Sorry!</p>
        <button className="error" onClick={home}>Home</button>
      </div>);
    }
    
    return this.props.children; 
  }
  
}

