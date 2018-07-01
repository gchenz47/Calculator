import React, { Component } from 'react';
import './App.css';
import Calculator from './calculator';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      total: null,
      next: null,
      operation: null,
    };
  }


  render() {
    return (
        <Calculator/>
    );
  }
}

export default App;
