import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import Header from "./Header";
import Main from "./Main";


class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>*/}
        <Header />
        <p className="App-title">
          Search What you want, Anything...
        </p>
        <Main />

      </div>
    );
  }
}

export default App;
