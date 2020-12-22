import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const ITEM_HEIGHT = 48;

export default function LongMenu(props) {

    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);
    const history = useHistory()
  

    function copyToClipboard(e) {
      textAreaRef.current.select();
      document.execCommand('copy');
      // This is just personal preference.
      // I prefer to not show the whole text area selected.
      e.target.focus();
      setCopySuccess('Copied!');
      setAnchorEl(null)
    };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  

  const handleExit = (e) => {
    props.exit()
    setAnchorEl(null);
  };

  const handleSort = (e) => {
    props.sort()
    setAnchorEl(null);
  };

  const handleStart = (e) => {
    props.start()
    setAnchorEl(null);
  };
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null)
  }

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
            selected='Quick Sort'
            name='sort'
            value="sort"
            onClick={handleSort}
          >
          Quick Sort
          </MenuItem>
        
        
          <MenuItem
            key="exit"
            selected='Copy Game Link'
            onClick={copyToClipboard}
        >
          <input
          className='combatant-info'
            style={{
              position: "fixed",
              fontSize: '1px',
              margin: '0',
              background: "transparent",
              border: 'none',
              color: 'transparent'
            }}
          ref={textAreaRef}
          value={`${props.url}`}
          readOnly
          />
            Copy Game Link
          </MenuItem>
         
          <MenuItem
                key="exit"
                selected='Exit Game'
                onClick={handleExit}
                style={{BackgroundColor: "darkred"}}
              >
              Exit Game
          </MenuItem>
      </Menu>
    </div>
  );
}