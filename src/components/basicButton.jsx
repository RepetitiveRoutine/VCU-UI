import * as React from 'react';
import Button from '@mui/material/Button';



export default function BasicButton() {
  
  const [text, setPorts] = React.useState("");

  async function buttonClicked(){
    const filePath = await window.electronAPI.openFile()
    setPorts(filePath[0].friendlyName)
    console.log(filePath[0].friendlyName)
    return "ok"
  }


  return (
     <Button variant="text" onClick={() => {buttonClicked();}  }>{text}</Button>
  );
}