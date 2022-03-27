import React from 'react';
import { SerialPort } from 'serialport';


function getPort()
{
    SerialPort.list()
}
  
export default function App()
{   
    getPort()
    return(
        <h1>port</h1>
    )
}