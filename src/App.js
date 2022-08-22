import logo from './combined_logo.svg';
import './css/App.css';
import * as React from 'react';
import DropdownCOM from './components/dropdownCOM';
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import ToggleDarkMode from './components/ToggleDarkMode'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from './components/NavBar'
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  // Port retrieved by Dropdown component from props
  const [port, setPort] = React.useState('')
  async function hitEnter(e) {
    console.log("HIT ENTER " + port)
    await window.electronAPI.openPort(port)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <NavBar/>

      <div className="App" id="canvas">
        <header id="title"></header>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" id="pepe" style={{ width: 300 }} />
          <p></p>

          <Grid container spacing={2} justifyContent="center">
            <Grid>
          <DropdownCOM onChange={(value) => setPort(value)} />
          </Grid>
          <Grid>
         
          <Link to="/ports">
            <Button onClick={hitEnter}>Enter</Button>
          </Link>
          </Grid>
          </Grid>

        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;

