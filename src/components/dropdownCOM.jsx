import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';



const DropdownCOM = (props) => {
  const [selectedPort, setSelectedPort] = React.useState('');
  const [portList, setPortList] = React.useState([]);
  const [isLoaded, setLoaded] = React.useState(false);
  const portArr = []

  const handleChange = (event) => {
    setSelectedPort(event.target.value);
    props.onChange(event.target.value);
  };
 
  async function loadPorts(){
    const ports = await window.electronAPI.getPorts()
    ports.forEach(port => {portArr.push(port.friendlyName); console.log(port)});
    setPortList(portArr)
  }

  if(!isLoaded)
  {
    loadPorts()
    setLoaded(true)
  }
  console.log(selectedPort)

  return (
    <div>
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, color:"white" }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedPort}
          label="Ports"
          onChange={handleChange}
          sx={{backgroundColor:"white",  borderRadius: 1}}
        >
        {portList.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
              </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 30 }}>
      </FormControl>
    </div>
  );
} 

export default DropdownCOM