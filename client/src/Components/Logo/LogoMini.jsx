import React from 'react'
import { useHistory } from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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


export default function Logo() {
  
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    logo: false,
  });
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    
    setState({ ...state, [anchor]: open });
  };

  const navLocations = new Object([
    ['Home', ''],
    ['Join Combat', 'join-room'],
    ['Create Combat', 'create-room'],
    ['FAQ', 'faq'],
  ])

  const handleNav = (option) => {
    history.push(`/${option}`)
    window.location.reload()
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
          <ListItem button key={text}
            onClick={() => handleNav(action)}
          >
              <ListItemText
                primary={text}
                />
          </ListItem>
        ))}
      </List>
    </div>
  );
  
  
  return (<>
    <div className='on-mini' style={{ zIndex: "99" }}>
      {['   '].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button style={{ height: "60px", width: "30px" }}
            onClick={toggleDrawer(anchor, true)}>
            {anchor}
          </Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
      <img className='on-mini'
        src='https://res.cloudinary.com/dyrvlnond/image/upload/v1608509018/Tracker/Artboard_1_llwk43.png' />
  </>)
}
