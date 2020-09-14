import React from 'react'
import { withRouter } from 'react-router-dom'

function DisplayPlayers(props) {

  console.log(props.users)

  return (

    <div>
          {props.users.map(thing =>
            <p>{thing.username}: {thing.initiative}</p>)}
      </div>
  )
}

export default withRouter(DisplayPlayers)