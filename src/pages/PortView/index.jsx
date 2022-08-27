import { Box, Typography, Paper } from "@mui/material";
import * as React from 'react';
import { TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import NavBar from "../../components/NavBar";

//import the Monitor file in the components folder 
import LineChart from "../../components/LineChart";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Convert the incoming sensor data
function float2int(value) {
  return value | 0;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export function useInterval(callback, delay) {

  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Use effect will poll SerialPort every delay in ms 
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay != null) {
      const id = setInterval(tick, delay)
      return () => {
        clearInterval(id);
      };
    }
  }, [callback, delay])
}

function PortView() {

  const [port, setPort] = React.useState(" ");
  const [serialData, setDataArray] = React.useState({});
  const [message, setMessage] = React.useState({});
  //create an async function that calls the electron api OpenPort
  async function sendMessage() {
    console.log("Message" + message.trim())
    await window.electronAPI.sendMessage(message.trim())
    console.log("requesting to send " + message)
  }

  useInterval(async () => {
    console.log("Interval proc");
    const message = await window.electronAPI.openCom()
    setPort(message)
    var parsedMsg = message.split(" ")
    console.log(parsedMsg)
    console.log(port)
    let dataStrFormat = {
      "BP": float2int(parsedMsg[1]),
      "APPS1": float2int(parsedMsg[3]),
      "APPS2": float2int(parsedMsg[5]),
      "TPS": float2int(parsedMsg[7])
    }
    setDataArray(dataStrFormat)
  }, 100)

  return (

    <div className="App" id="canvas">
      <header id="title"></header>
      <header className="App-header">

        
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />

          <NavBar/>


          <div align='center'>
            <LineChart colour="#ffa600" value="APPS1" name="BPS" ></LineChart>
          </div>

          <Box justifyContent='center' align='center' bottom="0px" sx={{
            display: 'flex',
            '& > :not(style)': {
              m: 1,
              width: 60,
              height: 15,
            },
          }}
          >
            <Typography align="center" variant="overline" component="div" gutterBottom>BP</Typography>
            <Typography align="center" variant="overline" component="div" gutterBottom>APPS1</Typography>
            <Typography align="center" variant="overline" component="div" gutterBottom>APPS2</Typography>
            <Typography align="center" variant="overline" component="div" gutterBottom>TPS</Typography>
          </Box>

          <Box justifyContent='center' align='center' sx={{
            display: 'flex',
            '& > :not(style)': {
              m: 1,
              width: 60,
              height: 30,
            },
          }}
          >
            <Paper >
              <Typography align="center" variant="overline" component="div" gutterBottom>
                {serialData.BP}
              </Typography>
            </Paper>
            <Paper >
              <Typography align="center" variant="overline" component="div" gutterBottom>
                {serialData.APPS1}
              </Typography>
            </Paper>
            <Paper >
              <Typography align="center" variant="overline" component="div" gutterBottom>
                {serialData.APPS2}
              </Typography>
            </Paper>
            <Paper >
              <Typography align="center" variant="overline" component="div" gutterBottom>
                {serialData.TPS}
              </Typography>
            </Paper>
          </Box>

          <Box>
            <TextField align='center' id="outlined-basic" label="Enter VCU Command" variant="outlined" onChange={(event) => { setMessage(event.target.value) }} onKeyPress={(ev) => {
              console.log(`Pressed keyCode ${ev.key}`);
              if (ev.key === 'Enter') {
                sendMessage(message)
                ev.target.value = ""
                ev.preventDefault();
              }
            }} />
          </Box>

        </ThemeProvider>
      </header>
    </div>

  );
}

export default PortView;