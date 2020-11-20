import React, { Component } from 'react'


export default class GameWebSocket extends Component {
  componentDidMount() {
    this.props.getGameData(this.props.code)
      
      this.props.cableApp.game =
      this.props.cableApp.cable.subscriptions.create({
        channel: 'GamesChannel',
        code: this.props.code
      },
      {
        received: (updatedGame) => {
          this.props.updateApp(updatedGame)
        }
      })
    }
    
    render() {
    return (
      <div>

      </div>
    )
  }
}
