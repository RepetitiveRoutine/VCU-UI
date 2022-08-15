import logo from './logo.svg';
import './css/App.css';
import * as React from 'react';
import DropdownCOM from './components/dropdownCOM';
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";

function App() {
  // Port retrieved by Dropdown component from props
  const [port, setPort] = React.useState('')
  async function hitEnter(e)
  {    
    console.log("HIT ENTER " + port)
    await window.electronAPI.openPort(port)
  }

  return (
    <div className="App" id="canvas">
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