import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "../../src/css/App.css"

const DropdownCOM = (props) => {
  const [selectedPort, setSelectedPort] = React.useState('');
  const [ports, setPorts] = React.useState([]);
  const [portList, setPortList] = React.useState([]);
  const [isLoaded, setLoaded] = React.useState(false);
  const portArr = []

  const handleChange = (event) => {

    setSelectedPort(event.target.value);
    // for each port in portList, find the port with the same value as event.target.value
    // and set the port's isSelected property to true
    ports.forEach(port => {
      if (port.manufacturer === event.target.value) {
        console.log("We have match, " + port.path)
        props.onChange(port.path);
      }
    })
  };
 
  async function loadPorts(){
    const ports = await window.electronAPI.getPorts()
    setPorts(ports)
    ports.forEach(port => { 
      // check if port.manufacturer is undefined 
      if(port.manufacturer === undefined){
        portArr.push(port.path)
      }else{
        portArr.push(port.manufacturer); 
      }
      console.log(port.path + "THIS IS IT")
    });
    setPortList(portArr)
  }

  

  if(!isLoaded)
  {
    loadPorts()
    setLoaded(true)
  }
  console.log(selectedPort)

  return (
    <div className="App" id="canvas">
    <FormControl variant="standard" size="medium" sx={{ minWidth: 200, maxWidth: 200, color:"white"}}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedPort}
          label="Ports"
          onChange={handleChange}
          sx={{borderRadius: 1}}>

        {portList.map((name) => (
            <MenuItem key={name} value={name}>{name}</MenuItem>
          ))}

        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 30 }}>
      </FormControl>
    </div>
  );
} 

export default DropdownCOM