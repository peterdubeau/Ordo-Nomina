import React, { Component } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router-dom' 
import DisplayPlayer from '../DisplayPlayers/DisplayPlayers'

class Main extends Component {
  state = {
    games: [],
    users: []
  }

  componentDidMount = () => {
    // fetch('http://localhost:3000/games/')
    //   .then(res => res.json())
    //   .then(gamesArr => this.setState({
    //     games: gamesArr
    //   }))
    // fetch(`http://localhost:3000/users`)
    //   .then(res => res.json())
    //   .then(usersArr => this.setState({
    //     users: usersArr
    //   }))
  }

  // handleReceivedGame = response => {
  //   if (response.type === "update_user") {
  //     let user = this.state.users.findIndex(user => user.id === response.data.id)
  //     let userUpdate = [...this.state.users]
  //     userUpdate[user] = {...userUpdate[user], initiative: response.data.initiative, username: response.data.username }
  //     this.setState({
  //       users: userUpdate
  //     })
  //   } else {
  //     console.log("Something went wrong")
  //   }
    
  // }

  render() {

    function generateCode() {
      let code = ''
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const charLength = characters.length
      for (let i = 0; i < charLength; i++) {
        code += characters.charAt(Math.floor(Math.random() * charLength))
      }
      return code.slice(0, 5)
    }
    const roomCode = generateCode()
    const code = roomCode

    
    
    return (
      <div className="App">
        <ActionCableConsumer
          channel={{ channel: 'GamesChannel' }}
          onReceived={this.handleReceivedGame}
        />
          <Route path ='/game/:code/users'>
            <DisplayPlayer code={code}/>
          </Route>
      </div>
    );
  }
}

export default withRouter(Main);


