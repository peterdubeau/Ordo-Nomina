import React from 'react'
import { withRouter } from 'react-router-dom'

function DisplayPlayers(props) {

  return (

    <div>
          {props.users.map(player =>
            <p className="player" key={`player ${i+=1}`}>{player.username}: {player.initiative}</p>)}
      </div>
  )
}

export default withRouter(DisplayPlayers)