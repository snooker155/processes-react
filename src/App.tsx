import React, { Component } from 'react';
import './App.css';
import Header from "./Header";
import Dashboard from "./Dashboard";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<Header/>*/}
        <Dashboard />
      </div>
    );
  }
}

export default App;
