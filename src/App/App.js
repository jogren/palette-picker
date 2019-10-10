import React, { Component } from 'react';
import Header from '../Header/Header';
import CurrentColors from '../CurrentColors/CurrentColors';
import CreatePaletteForm from '../CreatePaletteForm/CreatePaletteForm';
import ProjectsContainer from '../ProjectsContainer/ProjectsContainer';
import SelectedPalettesContainer from '../SelectedPalettesContainer/SelectedPalettesContainer';
import { setCurrentPalette } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
let randomColor = require('randomcolor');

export class App extends Component {

  componentDidMount() {
    let colors = randomColor({
      count: 5    
    });
    this.props.setCurrentPalette(colors)
  }

  render() {
    return (
      <main className="App">
        <Header />
        <CurrentColors />
        <CreatePaletteForm />
        <ProjectsContainer />
        <SelectedPalettesContainer />
      </main>
    );
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({ setCurrentPalette }, dispatch)
)

export default connect(null, mapDispatchToProps)(App);
