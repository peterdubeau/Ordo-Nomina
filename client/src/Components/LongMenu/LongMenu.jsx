import React, {useState, useRef} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const ITEM_HEIGHT = 48;

export default function LongMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
            background: "#21072A",
            color: "#DFDF8E"
          },
        }}
      >
          <MenuItem
            key="exit"
            selected='Start Combat'
            onClick={props.start}
          >
          Start Combat
          </MenuItem>
        
          <MenuItem
            key="exit"
            selected='Quick Sort'
            onClick={props.sort}
          >
          Quick Sort
          </MenuItem>
        
          <MenuItem
            key="exit"
            selected='Start Combat'
            onClick={props.exit}
          >
          Exit Game
          </MenuItem>
        
          {/* <MenuItem
            key="exit"
            selected='Copy Game Link'
            onClick={copyToClipboard}
          >
            Copy Game Link
          </MenuItem> */}
      </Menu>
    </div>
  );
}