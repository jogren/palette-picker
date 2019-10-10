import React, { Component } from 'react';
import Header from '../Header/Header';
import CurrentColors from '../CurrentColors/CurrentColors';
var randomColor = require('randomcolor');

class App extends Component {
  constructor() {
    super();
    this.state = {
      colors: []
    }
  }

  componentDidMount() {
    let colors = randomColor({
      count: 5    
    });
    this.setState({colors})
  }

  render() {
    return (
      <main className="App">
        <Header />
        <CurrentColors colors={this.state.colors}/>
      </main>
    );
  }
}

export default App;
