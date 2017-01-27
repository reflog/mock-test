import React, { Component } from 'react';
import { LoginForm } from './components/Login';
import './App.css';

class App extends Component {
  state = {
    loggedIn: localStorage.getItem("token") !== undefined
  };
  render() {
    return (
      <div className="App">
        <LoginForm loggedInCallback={()=>this.setState({loggedIn: true})}/> 
      </div>
    );
  }
}

export default App;
