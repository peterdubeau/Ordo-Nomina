import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom'
import CreateRoom from './Components/CreateRoom/CreateRoom'
import ShowGame from './Components/ShowGame/ShowGame'
import './App.css';


class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: null,
      allRooms: [],
      currentGame: {
        game: {},
        users: []
      }
    }
  }

  getGameData = (id) => {
    fetch(`http://localhost:3000/game/${id}/users`)
      .then(response => response.json())
      .then(results => {
        this.setState({
          currentUser: true,
          currentGame: {
            game: results,
            users: results.users
          }
        })
      })
  }

  updateAppStateGame = (newGame) => {
    if (newGame.type === "new_user") {
      console.log("new_user")
      this.setState({
        currentGame: {
          game: newGame.game,
          users: [...this.state.currentGame.users, newGame.user]
        }
      })
    } else if (newGame.type === "update_user") {
      console.log("update_user")
      let user = this.state.currentGame.users.findIndex(user => user.id === newGame.user.id)
      let userUpdate = [...this.state.currentGame.users]
      console.log(userUpdate)
      userUpdate[user] = { ...userUpdate[user], initiative: newGame.user.initiative, username: newGame.user.username }
      this.setState({
        currentGame: { users: userUpdate }
      })
    } else if (newGame.type === "delete_user") {
      console.log("delete_user")
      let user = this.state.currentGame.users.findIndex(user => user.id === newGame.user.id)
      let userUpdate = [...this.state.currentGame.users]
      userUpdate.splice(userUpdate[user], 1)
      this.setState({
        currentGame: { users: userUpdate }
      })
    } else {
      console.log("whoopsie")
    }
  }


  generateCode = () => {
    let code = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const charLength = characters.length
    for (let i = 0; i < charLength; i++) {
      code += characters.charAt(Math.floor(Math.random() * charLength))
    }
    return code.slice(0, 5)
  }

  render() {
    
    const roomCode = this.generateCode()

    return (
      <div className="App">
        <Route exact path='/game/:code/users/' render={(props) => {
          return this.state.currentGame.users ?
            (<ShowGame
              {...props}
              cableApp={this.props.cableApp}
              updateApp={this.updateAppStateGame}
              getGameData={this.getGameData}
              gameData={this.state.currentGame.users}
              currentUser={this.state.currentUser}
            />
            ) : (
              <Redirect to='/' />
            )
        }}>
        </Route>
        <Route path='/create-game'>
          <CreateRoom code={roomCode}/>
        </Route>
        
      </div>
    );
  }
}

export default withRouter(App);
