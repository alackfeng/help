import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';



import willTransitionTo from './routerTransition';
import Header from "./Header";
import Main from "./Main";
import HelpActions from "./HelpActions";

let _This = null;
class App extends Component {

  constructor() {
    super();
    console.log('============ App::constructor : call ');

    this.state = {
      synced: false,
    }
    this._callback.bind(this);

    _This = this;
  }
  componentWillMount(nextProps, nextState) {
    
    
    willTransitionTo(nextProps, nextState, this._callback);
  }

  _callback(result, e) {
    console.log('============ App::willTransitionTo callback: ', result);

    if(result === 'synced') {
      _This.setState({synced: true});
      HelpActions.setSync(true);
    } 
  };

  componentDidMount() {
    console.log('============ App::componentDidMount : call ');
  }

  render() {
    console.log('============ App::render : call ');
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
        {/*this.state.synced ? <Main dynGlobalObject="2.1.0" /> : null*/}

      </div>
    );
  }
}

export default App;
