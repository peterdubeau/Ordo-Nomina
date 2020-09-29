import React from 'react'
import { withRouter } from 'react-router-dom'
import { ActionCableConsumer } from 'react-actioncable-provider';

class DisplayPlayers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }
  
  componentDidMount = () => {
    fetch(`http://localhost:3000/game/${this.props.match.params.code}/users`)
      .then(res => res.json())
      .then(usersArr => this.setState({
        users: usersArr.users
      }))
      
  }

  handleReceivedUser = response => {
    if (response.type === "update_user") {
      let user = this.state.users.findIndex(user => user.id === response.data.id)
      let userUpdate = [...this.state.users]
      userUpdate[user] = {...userUpdate[user], initiative: response.data.initiative, username: response.data.username }
      this.setState({
        users: userUpdate
      })
    } else if (response.type === "delete_user") {
      let user = this.state.users.findIndex(user => user.id === response.data.id)
      console.log(user)
      let userUpdate = [...this.state.users]
      userUpdate.splice(userUpdate[user],1)
      // userUpdate[user] = {...userUpdate[user], initiative: response.data.initiative, username: response.data.username }
      this.setState({
        users: userUpdate
      })
    } else if (response.type === "add_user") {
      console.log(response)
      this.setState({
        users: [...this.state.users, response.data]
      })
    }
    
  }

  render() {

    const handleClick = () => {

      let sortedList = this.state.users.sort(function (a, b) {
        return a.initiative - b.initiative
      })
       this.setState({
         users: sortedList
       })
       
    }

    let i = 0
    let list = this.state.users


    return (<>
    <ActionCableConsumer
          channel={{ channel: 'UsersChannel' }}
          onReceived={this.handleReceivedUser}
        />

    <div>
          {list.map(player =>
            <p className="player" key={`player ${i += 1}`}>{player.id} --- {player.username}: {player.initiative}</p>)}
      <button onClick={() => handleClick(list)}>Sort players</button>
      Code: {this.props.match.params.code}
    </div>
    
    
 </> )
  } 
} 

export default withRouter(DisplayPlayers)