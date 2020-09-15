import React, { Component } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import './App.css';

class App extends Component {
  state = {
    games: [],
    users: []
  }

  componentDidMount = () => {
    fetch('http://localhost:3000/games/')
      .then(res => res.json())
      .then(gamesArr => this.setState({
        games: gamesArr
      }))
    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(usersArr => this.setState({
        users: usersArr
      }))
  }

  handleReceivedGame = response => {
    // console.log(response)
    this.setState({
      games: [...this.state.games, response],
      users: [...this.state.users, response]
    })
  }

  componentDidUpdate = () => {
    if (this.handleReceivedGames) {
      this.handleReceivedGames()
    }
  }

  render() {
    console.log(this.state.users)
    // console.log(Array.isArray(this.state.users[0]))
    return (
      <div className="App">
        <ActionCableConsumer
          channel={{ channel: 'GamesChannel' }}
          onReceived={this.handleReceivedGame}
        />
        <ActionCableConsumer
          channel={{ channel: 'UsersChannel' }}
          onReceived={this.handleReceivedGame}
        />
        <div>
      

          {this.state.users.map(thing =>
            <p><span>{thing.id}</span>  {thing.username}: INI: {thing.initiative} </p>)}
    
      </div>
      </div>
    );
  }
}

export default App;
