import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom'
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

  // componentDidMount = () => {
  //   fetch('http://localhost:3000/games/')
  //     .then(res => res.json())
  //     .then(gamesArr => this.setState({
  //       game: gamesArr
  //     }))
  // }

  getGameData = () => {
    fetch(`http://localhost:3000/game/TEST3/users`)
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
    console.log(newGame.user)
    this.setState({
      currentGame: {
        game: newGame.game.data,
        users: newGame.users
      }
    })
  }

  render() {
    

    return (
      <div className="App">
        <Route exact path='/game/:code/' render={(props) => {
          return this.state.currentGame.users ?
          ( <ShowGame
              {...props}
              cableApp={this.props.cableApp}
              updateApp={this.updateAppStateGame}
              getGameData={this.getGameData}
              gameData={this.state.currentGame.users}
              currentUser={this.state.currentUser}
          />
    ) : (
        <Redirect to='/game/TEST3/' />
    )
        }}>
        </Route>
        
      </div>
    );
  }
}

export default withRouter(App);
