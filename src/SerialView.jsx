import logo from './logo.svg';
import './css/App.css';
import * as React from 'react';

function SerialView() {
  return (
    <div className="SerialView">
      <header id="title"></header>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" id="pepe" />
        <p id="cool">
            Nothing's here?
        </p>
        <a
          id="pepe"
          className="App-link"
          href="https://i.pinimg.com/736x/61/c7/80/61c780b045f999daacfd85e6f5ee96c8.jpg"
          target="_blank"
          rel="noopener noreferrer"
        > so sad.</a>
        <p>No available devices.</p>
      </header>
    </div>
  );
}

export default SerialView;
