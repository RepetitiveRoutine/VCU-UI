import { Box } from "@mui/material";
import * as React from 'react';
import { Button } from "@mui/material";

function PortView() {


  const [port, setPort] = React.useState("");

  //create an async function that calls the electron api OpenPort
	async function openPort(){
			var porty = await window.electronAPI.openPort(true)
      setPort()
      console.log()
	}

  return (
    <Box>
			<Button variant="contained" color="primary" onClick={() => {openPort();} }>Open Port</Button>	
      ACCOUNT PAGE
    </Box>
  );
}

export default PortView;