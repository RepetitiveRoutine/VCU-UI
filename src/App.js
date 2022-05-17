import logo from './logo.svg';
import './css/App.css';
import * as React from 'react';
import BasicButton from './components/basicButton';
import DropdownCOM from './components/dropdownCOM';
import {Link} from 'react-router-dom';
import { Box, Typography, Paper, TextField } from "@mui/material";


function App() {
  return (
    <div className="App">
      <header id="title"></header>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" id="pepe" />
        <p id="cool">
          Which port do u want? 
        </p>
        
        <BasicButton></BasicButton>
        
        <DropdownCOM></DropdownCOM>

        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '7.5ch'},
      }}
      noValidate
      autoComplete="off"
    >

        <TextField sx={{input: {color: "white",height:'2ch'}}} label="Baudrate" color="" focused />
        <TextField sx={{input: {color: "white",height:'2ch'}}} label="stopBits" color="" focused />
        <TextField sx={{input: {color: "white",height:'2ch'}}} label="dataBits" color="" focused />
        <TextField sx={{input: {color: "white",height:'2ch'}}} label="parity" color="" focused />
        </Box>


        <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
          }}
         >
          
          
          <Link to="/ports">Ports Baby</Link>
        </nav>
      </header>
      
    </div>
  );
}


export default App;
