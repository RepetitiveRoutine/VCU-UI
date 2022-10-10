import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import CropSquareIcon from '@mui/icons-material/CropSquare';

export default function NavBar() {

  async function minimize(e) {
    await window.electronAPI.minimizeApp()
  }

  async function maximize(e) {
    await window.electronAPI.maximizeApp()
  }

  async function exit(e) {
    await window.electronAPI.closeApp()
  }
  return (
    <Box  sx={{ flexGrow: 1 }} style={{"WebkitAppRegion": "drag"}}>
      <AppBar position="static">

        <Toolbar variant="dense">
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
          
        </Toolbar>
        
      </AppBar>
      <Button color="inherit" onClick={minimize}><RemoveIcon/></Button>
      <Button color="inherit" onClick={maximize}><CropSquareIcon/></Button>
    <Button color="inherit" onClick={exit}><CloseIcon/></Button>
    </Box>
  );
}
