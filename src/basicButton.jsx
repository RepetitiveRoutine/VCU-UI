import * as React from 'react';
import Button from '@mui/material/Button';

export default function BasicButton() {
  
  const [text, setText] = React.useState("");

  async function buttonClicked(){
    const filePath = await window.electronAPI.openFile()
    setText("hello")
    console.log("hello?")
    return "ok"
  }
  return (
     <Button variant="text" onClick={buttonClicked()}>Text</Button>
  );
}