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

  componentDidMount = () => {
    let colors = randomColor({
      count: 5
    });

    let structuredColors = colors.map(color => {
      return { hexCode: color, isLocked: false }
    })
    console.log(structuredColors)
    this.props.setCurrentPalette(structuredColors)
  }
  
  generateRandomColors = () => {
    const { setCurrentPalette, currentPalette } = this.props;
    let updatedColors = currentPalette.map(color => {
      if(color.isLocked) {
        return color
      } else {
        return { hexCode: randomColor(), isLocked: false };
      }
    })

    setCurrentPalette(updatedColors)
  }

  render() {
    return (
      <main className="App">
        <Header generateColors={this.generateRandomColors}/>
        <CurrentColors />
        <CreatePaletteForm />
        <ProjectsContainer />
        <SelectedPalettesContainer />
      </main>
    );
  }
}

const mapStateToProps = ({ currentPalette }) => ({
  currentPalette
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ setCurrentPalette }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(App);
