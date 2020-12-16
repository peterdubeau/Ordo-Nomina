import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import PlayerLobby from '../PlayerLobby/PlayerLobby'
import AdminLobby from '../AdminLobby/AdminLobby'
import PlayerCombat from '../PlayerCombat/PlayerCombat'
import AdminCombat from '../AdminCombat/AdminCombat'

class Main extends Component {
  constructor(props) {
    super()
    this.state = {
      inCombat: '',
      currentGame: {
        game: {},
        users: [],
        combatants: ''
      }
    }
  }


  getGameData = async (id) => {
    const baseUrl = process.env.NODE_ENV === 'production'
      ? `https://${process.env.REACT_APP_API_DEPLOYMENT}`
      : `http://localhost:3000`;
    await fetch(`${baseUrl}/game/${id}/users`)
        .then(response => response.json())
        .then(results => {
          this.setState({
            currentGame: {
              game: results,
              users: results.users,
              combatants: results.combatants
            }
          })
        })
  }

  handleUpClick = (index) => {
    if (index !== 0) {
      this.setState(prevState => {
        let list = [...prevState.currentGame.users.filter(user => user.is_admin === false)]
        let temp = list[index - 1];
        list[index - 1] = list[index];
        list[index] = temp;
        return {
          currentGame: {
              ...this.state.currentGame,
              users: list
          }
        }
      })
    }
  }

  handleDownClick = (index) => {
    if (index !== this.state.currentGame.users.length - 1) {
      this.setState(prevState => {
        let list = [...prevState.currentGame.users.filter(user => user.is_admin === false)]
        let temp = list[index + 1];
        list[index + 1] = list[index];
        list[index] = temp;
        return {
          currentGame: {
            ...this.state.currentGame,
            users: list
          }
        }
      })
    }
  }
  
        
  handleSort = () => {
    let list = this.state.currentGame.users.sort(function (a, b) {
      return b.initiative - a.initiative
    })
    this.setState({
      users: list
    })
  }


  makeArray = (data) => {
    let players = []
    data.forEach(user => {
      if (user.is_admin === false) {
        players.push(user.id)
      } else {
      }
    })
    return players
  }


  updateAppStateGame = async (newGame) => {
    if (newGame.type === "new_user") {
      await newGame
      this.setState({
        currentGame: {
          game: newGame.game,
          users: [...this.state.currentGame.users, newGame.user]
        }
      })
    } else if (newGame.type === "update_user") {
      let user = this.state.currentGame.users.findIndex(user => user.id === newGame.user.id)
      let userUpdate = [...this.state.currentGame.users]
      userUpdate[user] = { ...userUpdate[user], initiative: newGame.user.initiative, username: newGame.user.username }
      this.setState({
        currentGame: { users: userUpdate }
      })
    } else if (newGame.type === "delete_user") {
    
      let user = this.state.currentGame.users.findIndex(user => user.id === newGame.user.id)
     
      let users = [...this.state.currentGame.users]
      users.splice(user, 1)
      this.setState({
        currentGame: {
          users: users,
          code: newGame.code,
          game: newGame.game
        }
      })

    } else if (newGame.type === "take_turn") {
      this.setState({
        currentGame: {
          game: newGame,
          code: newGame.code,
          combatants: newGame.combatants,
          users: newGame.users
        }
      })

    } else if (newGame.type === 'game_start') {
      this.setState({
        inCombat: true,
        currentGame: {
          game: newGame,
          code: newGame.code,
          users: newGame.users,
          combatants: newGame.combatants
        }
      })

    } else if (newGame.type === "delete_game") {
      this.setState({
        inCombat: false,
        currentGame: {
          game: {},
          users: [],
          combatants: ''
        }
      })
    } else if (newGame.type === "remove_guy"){
      this.setState({
        inCombat: true,
        currentGame: {
          game: newGame,
          code: newGame.code,
          users: newGame.users,
          combatants: newGame.combatants
        }
      })
    } else if (newGame.type === "to_lobby") {
      console.log(newGame)
      window.location.reload()
      this.setState({
        inCombat: "lobby",
        currentGame: {
          game: {},
          users: [],
          combatants: ''
        }
      })
    }
  }

  render() {
   
    return (
      <div className="App">


        <Route exact path='/game/:code/DM/:username' render={(props) => {
          return this.state.currentGame ?
            (<AdminLobby
              {...props}
              userList={this.makeArray}
              sort={this.handleSort}
              arrange={this.handleUpClick}
              arrangeDown={this.handleDownClick}
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


        <Route exact path='/combat/:code/DM/:username' render={(props) => {
          return this.state.currentGame ?
            (<AdminCombat
              {...props}
              code={this.state.currentGame.code}
              turn={this.takeTurn}
              cableApp={this.props.cableApp}
              updateApp={this.updateAppStateGame}
              getGameData={this.getGameData}
              users={this.state.currentGame.users}
              gameData={this.state.currentGame}
            />

            ) : (
              <Redirect to='/' />
            )
        }}>
        </Route>




        <Route exact path='/game/:code/user/:username' render={(props) => {
          return this.state.currentGame ?
            (<PlayerLobby
              {...props}
              cableApp={this.props.cableApp}
              updateApp={this.updateAppStateGame}
              getGameData={this.getGameData}
              gameData={this.state.currentGame}
              currentUser={this.state.currentUser}
              startGame={this.state.inCombat}
            />
            ) : (
              <Redirect to='/' />
            )
        }}>
        </Route>




        <Route exact path='/combat/:code/player/:username' render={(props) => {
          return this.state.currentGame ?
            (<PlayerCombat
              {...props}
              cableApp={this.props.cableApp}
              updateApp={this.updateAppStateGame}
              getGameData={this.getGameData}
              gameData={this.state.currentGame}
              end={this.state.inCombat}
            />

            ) : (
              <Redirect to='/' />
            )
        }}>
        </Route>


      </div>
    );
  }
}

export default Main;
