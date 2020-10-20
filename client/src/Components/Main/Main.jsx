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
      currentUser: null,
      currentGame: {
        game: {},
        users: [],
        combatants: ''
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

  makeArray = (data) => {
    let players = []
    console.log(data)
    data.forEach(user => {
      if (user.is_admin === false) {
        players.push(`${user.username} - ${user.initiative}`)
      } else {
        console.log(`admin is ${user.username}`)
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
      let userUpdate = [...this.state.currentGame.users]
      userUpdate.splice(userUpdate[user], 1)
      this.setState({
        currentGame: { users: userUpdate }
      })
      // } else if (newGame.type === "sort_players") {
      //   let playerList = [...this.state.currentGame.users]
      //   let sortedList = playerList.sort((a, b) => (a.initiative - b.initiative)) 
      //   console.log(sortedList)
      //   // updateGame(this.state.currentGame.game.code, sortedList)
      //   this.setState({
      //     currentGame: { users: sortedList }
      //   }) 
    } else if (newGame.type === 'combatants') {
      console.log(newGame.list)
      let combatants = this.makeArray(newGame.list)
      let users = this.state.currentGame.users
      // let playerList = [...this.state.currentGame.users]
      sendCombatants(
        newGame.code,
        combatants
        )
      this.setState({
        users: users
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
        <Route exact path='/game/:code/user/:username' render={(props) => {
          return this.state.currentGame ?
            (<PlayerLobby
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
        
        <Route exact path='/game/:code/DM/:username' render={(props) => {
          return this.state.currentGame ?
            (<AdminLobby
              {...props}
              userList={this.makeArray}
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

export default withRouter(Main);
