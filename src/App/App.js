import React, { Component } from 'react';
import Header from '../Header/Header';
import CurrentColors from '../CurrentColors/CurrentColors';
import CreatePaletteForm from '../CreatePaletteForm/CreatePaletteForm';
import ProjectsContainer from '../ProjectsContainer/ProjectsContainer';
import SelectedPalettesContainer from '../SelectedPalettesContainer/SelectedPalettesContainer';
import { setCurrentPalette, setCurrentProjects, setSelectedPalettes, setCurrentPaletteId } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllProjects, deletePaletteFromDB, getSelectedPalettes } from '../util/apiCalls';
let randomColor = require('randomcolor');

export class App extends Component {

  componentDidMount = async () => {
    const { setCurrentProjects } = this.props;
    this.setRandomPalette();
    const projects = await getAllProjects();
    setCurrentProjects(projects)
  }

  setRandomPalette = () => {
    const { setCurrentPalette } = this.props;
    let colors = randomColor({ count: 5 });

    let structuredColors = colors.map(color => {
      return { hexCode: color, isLocked: false }
    })
    setCurrentPalette(structuredColors)
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

  deletePalette = async (paletteId, projectId) => {
    const { setSelectedPalettes } = this.props;
    await deletePaletteFromDB(paletteId)
    const updatePalettes = await getSelectedPalettes(projectId);
    setSelectedPalettes(updatePalettes)
  }

  editPalette = (paletteId) => {
    const { selectedPalettes, setCurrentPalette, setCurrentPaletteId } = this.props;
    const targetPalette = selectedPalettes.find(palette => palette.id === paletteId);
    const colorKeys = ['color1', 'color2', 'color3', 'color4', 'color5']
    let structuredPalette = colorKeys.map(key => {
      return {
        hexCode: targetPalette[key],
        isLocked: true
      }
    })
    console.log(targetPalette.id, targetPalette.name)
    setCurrentPaletteId(targetPalette.id, targetPalette.name, targetPalette.project_id)
    setCurrentPalette(structuredPalette)

  }
  
  render() {
    return (
      <main className="App">
        <Header generateColors={this.generateRandomColors}/>
        <CurrentColors toggleLock={this.toggleLock}/>
        <CreatePaletteForm setRandomPalette={this.setRandomPalette}/>
        <section className="App_projects-section">
          <ProjectsContainer />
          <SelectedPalettesContainer deletePalette={this.deletePalette} editPalette={this.editPalette}/>
        </section>
      </main>
    );
  }
}

const mapStateToProps = ({ currentPalette, selectedPalettes }) => ({
  currentPalette,
  selectedPalettes
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ setCurrentPalette, setCurrentProjects, setSelectedPalettes, setCurrentPaletteId }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(App);
