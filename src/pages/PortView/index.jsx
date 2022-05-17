import { Box, Typography, Paper } from "@mui/material";
import * as React from 'react';
import { Button } from "@mui/material";
//import ApexChart from '../../components/serialList';
import { useEffect, useRef } from "react";
import { LineChart, Line } from 'recharts';
//import '@fontsource/roboto/30.css'
import Chart from '../../components/tpuGraph'

function float2int(value) {
  return value | 0;
}

export function useInterval(callback, delay) {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

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
  //create an async function that calls the electron api OpenPort
  async function openPort() {
    await window.electronAPI.sendMessage()
    console.log("requesting to send tpcal")
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
      <Button variant="contained" color="primary" onClick={() => { openPort(); }}>tpcal</Button>

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