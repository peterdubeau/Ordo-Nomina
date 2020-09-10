import React, { Component } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    games: []
  }

  componentDidMount = () => {
    fetch('http://localhost:3000/games')
      .then(res => res.json())
      .then(gamesArr => this.setState({
        games: gamesArr
      }))
  }

  handleReceivedRoom = response => {
    console.log(response)
    this.setState({
      games: [...this.state.games, response.game]
    })
  }

  render() {
  console.log(this.state.games)
    return (
      <div className="App">
        <ActionCableConsumer
          channel={{ channel: 'GamesChannel' }}
          onReceived={this.handleReceivedRoom}
        />
      </div>
    );
  }
}

export default App;
