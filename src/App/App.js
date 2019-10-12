import React, { Component } from 'react';
import Header from '../Header/Header';
import CurrentColors from '../CurrentColors/CurrentColors';
import CreatePaletteForm from '../CreatePaletteForm/CreatePaletteForm';
import ProjectsContainer from '../ProjectsContainer/ProjectsContainer';
import SelectedPalettesContainer from '../SelectedPalettesContainer/SelectedPalettesContainer';
import { setCurrentPalette, setCurrentProjects, setSelectedPalettes } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllProjects, deletePaletteFromDB, getSelectedPalettes } from '../util/apiCalls';
let randomColor = require('randomcolor');

export class App extends Component {

  componentDidMount = async () => {
    const { setCurrentPalette, setCurrentProjects } = this.props;
    let colors = randomColor({ count: 5 });

    let structuredColors = colors.map(color => {
      return { hexCode: color, isLocked: false }
    })
    setCurrentPalette(structuredColors)
    const projects = await getAllProjects();
    setCurrentProjects(projects)
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
    await deletePaletteFromDB(paletteId)
    const updatePalettes = await getSelectedPalettes(projectId);
    this.props.setSelectedPalettes(updatePalettes)

  }
  
  render() {
    return (
      <main className="App">
        <Header generateColors={this.generateRandomColors}/>
        <CurrentColors toggleLock={this.toggleLock}/>
        <CreatePaletteForm />
        <section className="App_projects-section">
          <ProjectsContainer />
          <SelectedPalettesContainer deletePalette={this.deletePalette}/>
        </section>
      </main>
    );
  }
}

const mapStateToProps = ({ currentPalette }) => ({
  currentPalette
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ setCurrentPalette, setCurrentProjects, setSelectedPalettes }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(App);
