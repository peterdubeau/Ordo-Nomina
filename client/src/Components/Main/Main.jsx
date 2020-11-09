import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom'
import { sendCombatants } from '../../services/games'
import PlayerLobby from '../PlayerLobby/PlayerLobby'
import AdminLobby from '../AdminLobby/AdminLobby'
import PlayerCombat from '../PlayerCombat/PlayerCombat'
import AdminCombat from '../AdminCombat/AdminCombat'

class Main extends Component {
  constructor(props) {
    super()
    this.state = {
      inCombat: false,
      currentGame: {
        game: {},
        users: [],
        combatants: ''
      }
    }
  }



  getGameData = (id) => {
    const baseUrl = process.env.NODE_ENV === 'production'
      ? `https://live-initiative-tracker.herokuapp.com`
      : `http://localhost:3000`;
    fetch(`${baseUrl}/game/${id}/users`)
      .then(response => response.json())
      .then(results => {
        this.setState({
          inCombat: false,
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
        this.setState({
          currentGame: {
            users: list
          }
        })
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
        // console.log(`admin is ${user.username}`)
      }
    })
    return players
  }


  updateAppStateGame = async (newGame) => {
    if (newGame.type === "new_user") {
      await newGame
      console.log("new_user")
      this.setState({
        currentGame: {
          game: newGame.game,
          users: [...this.state.currentGame.users, newGame.user]
        }
      })
      console.log(newGame)
    } else if (newGame.type === "update_user") {
      console.log("update_user")
      let user = this.state.currentGame.users.findIndex(user => user.id === newGame.user.id)
      let userUpdate = [...this.state.currentGame.users]
      userUpdate[user] = { ...userUpdate[user], initiative: newGame.user.initiative, username: newGame.user.username }
      this.setState({
        currentGame: { users: userUpdate }
      })
    } else if (newGame.type === "delete_user") {
      console.log("delete_user")
      let user = this.state.currentGame.users.findIndex(user => user.id === newGame.user.id)
      console.log(newGame.user)
      let users = [...this.state.currentGame.users]
      users.splice(user, 1)
      this.setState({
        currentGame: {
          users: users,
          game: newGame.game
        }
      })
      console.log(this.state.currentGame.users)



    } else if (newGame.type === "take_turn") {

      console.log(newGame)
      this.setState({
        currentGame: {
          game: newGame,
          combatants: newGame.combatants,
          users: newGame.users
        }
      })

      console.log(this.state.currentGame.game)

    } else if (newGame.type === 'game_start') {

      this.setState({
        inCombat: true,
        currentGame: {
          game: newGame,
          users: newGame.users,
          combatants: newGame.combatants
        }
      })

    } else if (newGame.type === "list") {
      console.log('list')
      // let users = newGame.users
      // let combatants = this.makeArray(users)
      // // this.updateAppStateGame({ combatants , type: 'array'})
    } else {
      console.log(newGame.type)
      console.log("woopsie")
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
              code={this.state.currentGame.game.code}
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
              startGame={this.state.inCombat}
              cableApp={this.props.cableApp}
              updateApp={this.updateAppStateGame}
              getGameData={this.getGameData}
              gameData={this.state.currentGame}
              currentUser={this.state.currentUser}
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
