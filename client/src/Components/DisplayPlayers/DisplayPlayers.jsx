import React from 'react'

export default function DisplayPlayers(props) {
  return (
    <div>
          {props.users.map(thing =>
            <p>{thing.username}: {thing.initiative}</p>)}
      </div>
  )
}
