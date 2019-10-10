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
    let colors = randomColor({ count: 5 });

    let structuredColors = colors.map(color => {
      return { hexCode: color, isLocked: false }
    })
    this.props.setCurrentPalette(structuredColors)
  }
  
  generateRandomColors = () => {
    const { setCurrentPalette, currentPalette } = this.props;
    let updatedColors = currentPalette.map(color => {
      return color.isLocked ? color : { hexCode: randomColor(), isLocked: false }
    })
    setCurrentPalette(updatedColors)
  }

  toggleLock = (toggleColor) => {
    const { currentPalette, setCurrentPalette } = this.props;
    let updatedPalette = currentPalette.map(color => {
      if (color.hexCode === toggleColor) {
        return { hexCode: color.hexCode, isLocked: !color.isLocked }
      } else {
        return color
      }
    })
    setCurrentPalette(updatedPalette)
  }
  
  render() {
    return (
      <main className="App">
        <Header generateColors={this.generateRandomColors}/>
        <CurrentColors toggleLock={this.toggleLock}/>
        <CreatePaletteForm />
        <section className="App_projects-section">
          <ProjectsContainer />
          <SelectedPalettesContainer />
        </section>
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
