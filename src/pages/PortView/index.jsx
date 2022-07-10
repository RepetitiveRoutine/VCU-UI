import { Box, Typography, Paper } from "@mui/material";
import * as React from 'react';
import { Button, TextField } from "@mui/material";
import { useEffect, useRef } from "react";

// Convert the incoming sensor data
function float2int(value) {
  return value | 0;
}

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
    await window.electronAPI.sendMessage(message)
    console.log("requesting to send " + message)
  }

  useInterval(async () => {
    console.log("Interval proc");
    const message = await window.electronAPI.openCom()
    setPort(message)
    var parsedMsg = message.split(" ")
    console.log(parsedMsg)
    let dataStrFormat = {
      "BP": float2int(parsedMsg[1]),
      "APPS1": float2int(parsedMsg[3]),
      "APPS2": float2int(parsedMsg[5]),
      "TPS": float2int(parsedMsg[7])
    }
    setDataArray(dataStrFormat)
  }, 100) 

  return (
    <div>
      <Box>
        <Typography variant="h4" component="div" gutterBottom>VCU UI</Typography>
        <p>{port}</p>
      </Box>
      
        <TextField align='center' justifyContent='center' id="outlined-basic" label="Enter VCU Command" variant="outlined" onChange={(event) => {setMessage(event.target.value)}} onKeyPress={(ev) => 
        {
          console.log(`Pressed keyCode ${ev.key}`);
          if (ev.key === 'Enter') {
            sendMessage(message)
            ev.target.value = "" 
            ev.preventDefault();
        }
        }}/>


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
          <Paper variant="outlined">
            <Typography align="center" variant="overline" component="div" gutterBottom>
              {serialData.BP}
            </Typography>
          </Paper>
          <Paper variant="outlined">
            <Typography align="center" variant="overline" component="div" gutterBottom>
              {serialData.APPS1}
            </Typography>
          </Paper>
          <Paper variant="outlined">
            <Typography align="center" variant="overline" component="div" gutterBottom>
              {serialData.APPS2}
            </Typography>
          </Paper>
          <Paper variant="outlined">
            <Typography align="center" variant="overline" component="div" gutterBottom>
              {serialData.TPS}
            </Typography>
          </Paper>
        </Box>
        </div>
        
  );
}

export default PortView;