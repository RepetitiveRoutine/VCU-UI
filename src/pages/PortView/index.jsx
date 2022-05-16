import { Box } from "@mui/material";
import * as React from 'react';
import { Button } from "@mui/material";
import SerialList from '../../components/serialList';
import { useEffect, useRef } from "react";

export function useInterval(callback, delay)
{
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick()
    {
      savedCallback.current();
    }
    if (delay != null)
    {
      const id = setInterval(tick, delay)
      return () => {
        clearInterval(id);
      };
    }
  }, [callback, delay])
}


function PortView() {

  const [port, setPort] = React.useState(" ");
  //create an async function that calls the electron api OpenPort
	async function openPort(){
			await window.electronAPI.sendMessage()
      console.log("requesting to send tpcal")
  }

  useInterval(async () => {
    console.log("Interval proc");
    const port1 = await window.electronAPI.openCom()
    setPort(port1)
  }, 100)

  return (
    <div>
    <Box>
			<Button variant="contained" color="primary" onClick={() => {openPort();} }>tpcal</Button>
      <p>{port}</p>	
    </Box>
    </div>
  );
}

export default PortView;