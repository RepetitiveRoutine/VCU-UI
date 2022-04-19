import logo from './logo.svg';
import './css/App.css';
import * as React from 'react';
import BasicButton from './components/basicButton';
import DropdownCOM from './components/dropdownCOM';
import {Link} from 'react-router-dom';
import {SerialView} from './SerialView';
import {Route, HashRouter} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <a href="./SerialView.js">profile</a>
      <header id="title"></header>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" id="pepe" />
        <p id="cool">
          Which port do u want? 
        </p>
        <Route path="/SerialView" component={SerialView} />
        <BasicButton></BasicButton>
        <DropdownCOM></DropdownCOM>
      </header>
      
    </div>
  );
}


export default App;
