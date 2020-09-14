import React, { Component } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { Route } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom' 
import './App.css';
import DisplayPlayer from './Components/DisplayPlayers/DisplayPlayers'

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
    fetch(`http://localhost:3000/users`)
      .then(res => res.json())
      .then(usersArr => this.setState({
        users: usersArr
      }))
  }

  handleReceivedGame = response => {
    console.log(response)
    this.setState({
      games: [...this.state.games, response],
      users: [...this.state.users, response]
    })
  }

  render() {
    // console.log(this.state.games)
    // console.log(this.state.users)
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
        <Router>
          <Route path ='/game/:code/users'>
            <DisplayPlayer users={this.state.users} />
          </Route>
        </Router>
      </div>
    );
  }
}

export default App;
