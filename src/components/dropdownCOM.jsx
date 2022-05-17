import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';


export default function DropdownCOM() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  
  const [ports, setPorts] = React.useState("");

  async function loadPorts(){
    const filePath = await window.electronAPI.openFile()
    setPorts(filePath[1].friendlyName)
    console.log(filePath[1].friendlyName)
    return "ok"
  }
  
  loadPorts()

  return (
    <div>
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, color:"white" }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={40}>{ports}</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 30 }}>
      </FormControl>
    </div>
  );
}