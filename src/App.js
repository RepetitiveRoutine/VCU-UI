import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import Stack from '@mui/material/Stack'; 
import Button from '@mui/material/Button';
import BasicButton from './basicButton';

function App() {
  /*
  const btn = document.getElementById('btn1')
  const filePathElement = document.getElementById('filePath1')

  btn?.addEventListener('click', async () => {
    const filePath = await window.electronAPI.openFile()
    filePathElement.innerText = filePath
    console.log("hello?")
  })*/

  return (
    <div className="App">
      <header id="title"></header>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" id="pepe" />
        <p id="cool">
          Hmm, no vcu-ui here? 
        </p>
        <a
          id="pepe"
          className="App-link"
          href="https://i.pinimg.com/736x/61/c7/80/61c780b045f999daacfd85e6f5ee96c8.jpg"
          target="_blank"
          rel="noopener noreferrer"
        >
          so sad.
        </a>
        <button type="button" id="btn1">Open a File</button>
        File path: <strong id="filePath1"></strong>
        <BasicButton></BasicButton>
        <p>No available devices.</p>
      </header>
    </div>
  );
}


export default App;
