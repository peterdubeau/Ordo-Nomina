import React from 'react'
import {useHistory} from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import './Logo.css'

const useStyles = makeStyles({
  list: {
    width: 200,
    height: "100vh",
    backgroundColor: "#21072A",
    color: "#DFDF8E"
    
  },
  fullList: {
    width: 'auto',
    height: "100vh",
    // backgroundColor: 'blue'
  },
});


export default function Logo(props) {
  
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    '   ': false,
  });
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    
    setState({ ...state, [anchor]: open });
  };

  let status = sessionStorage.getItem('gameStatus')
  let prevPage = sessionStorage.getItem('lastUrl')
 

  const navLocations = new Object([
    ['Home', '/'],
    ['Join Combat', '/join-room'],
    ['Create Combat', '/create-room'],
    ['FAQ', '/faq'],
    ['Contact', "/contact"],
    ['Tutorial', 'thing']
  ])
  
  if (status === "lobby" && prevPage !== window.location.pathname) {
    navLocations.push(['Return to Lobby', prevPage.slice(1)])
  } else if (status === "combat" && prevPage !== window.location.pathname) {
    navLocations.push(['Return to Combat', prevPage.slice(1)])
  } else if (status === "none" || prevPage === 'none') {
    navLocations.splice(-1,1)
  }
  


  const navOptions = Object.fromEntries(navLocations)

  const navControl = (option, action) => {
    if (option === 'Tutorial') {
      props.show()
    } else {
      history.push(`${action}`)
    }
  }
  
  
  const list = (anchor) => (
    <div
    className={clsx(classes.list, {
      [classes.fullList]: anchor === 'top' ,
    })}
    role="presentation"
    onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}
    
    >
      <List>
        {navLocations.map(([text, action]) => (
          <ListItem button key={text}>
            { text === 'Return to Lobby' || text === 'Return to Combat' ? 
              <ListItemText
              style={{color: "red"}}
              primary={text}
              onClick={() => navControl(text, action)} />
              :
              <ListItemText
                primary={text}
                onClick={() => navControl(text, action)} />
              
        }
          </ListItem>
        ))}
      </List>
    </div>
  );
  
  
  return (<>
    <div className='on-mini' style={{ zIndex: "99" }}>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button style={{
            height: "60px",
            width: "30px",
            color:"rgba(0,0,0,0)"
          }}
            onClick={toggleDrawer(anchor, true)}>
            {anchor}
          </Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
    <div className='on-mini'>
      <MenuIcon/>
      </div>
       
  </>)
}
