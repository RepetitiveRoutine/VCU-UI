import logo from './logo.svg';
import './css/App.css';
import * as React from 'react';
import BasicButton from './components/basicButton';
import DropdownCOM from './components/dropdownCOM';
import { Link } from 'react-router-dom';
import { Box, Typography, Paper, Button, TextField } from "@mui/material";


function App() {
  // Port retrieved by Dropdown component from props
  const [port, setPort] = React.useState('')
  async function hitEnter(e)
  {    
    const regex = port.match(/\(([^)]+)\)/)[1]
    await window.electronAPI.openPort(regex)
  }


  return (
    <div className="App">
      <header id="title"></header>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" id="pepe" />
        <p id="cool">
          Which port do u want?
        </p>
        <DropdownCOM onChange={(value) => setPort(value)} />
        <Link to="/ports">
          <Button onClick={hitEnter}>Enter</Button>
        </Link>
      </header>
    </div>
  );
}

export default App;