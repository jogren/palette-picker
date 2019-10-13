import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewPalette, getSelectedPalettes, editPalette } from '../util/apiCalls';
import { setSelectedPalettes, clearSelectedPaletteId } from '../actions';
import { bindActionCreators } from 'redux';

export class CreatePaletteForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      currentProject: ""
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleCurrentProject = (target) => {
    this.setState({currentProject: target})
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { currentProjects, currentPalette, setSelectedPalettes} = this.props;
    const { name, currentProject } = this.state;
    const projectId = currentProjects.find(project => project.name === currentProject).id;
    const postPalette = {
      name: name,
      project_id: projectId,
      color1: currentPalette[0].hexCode,
      color2: currentPalette[1].hexCode,
      color3: currentPalette[2].hexCode,
      color4: currentPalette[3].hexCode,
      color5: currentPalette[4].hexCode
    }
    await postNewPalette(postPalette);
    const updatePalettes = await getSelectedPalettes(projectId);
    setSelectedPalettes(updatePalettes)
    this.setState({ name: "" })
  }

  handleSaveEdits = async () => {
    const { currentPalette, currentPaletteId, setSelectedPalettes, clearSelectedPaletteId, setRandomPalette } = this.props;
    const paletteToEdit = {
      color1: currentPalette[0].hexCode,
      color2: currentPalette[1].hexCode,
      color3: currentPalette[2].hexCode,
      color4: currentPalette[3].hexCode,
      color5: currentPalette[4].hexCode
    }
    await editPalette(paletteToEdit, currentPaletteId.id)
    const updatePalettes = await getSelectedPalettes(currentPaletteId.projectId);
    setSelectedPalettes(updatePalettes);
    clearSelectedPaletteId();
    setRandomPalette();
  }

  render() {
    const { currentProjects, currentPaletteId } = this.props;
    let displayProjects = currentProjects.map(project => {
      return <option key={project.name} value={project.name}>{project.name}</option>
    })
    return (
      <section className="CreatePalette_section">
        {currentPaletteId && <div>
          <button onClick={this.handleSaveEdits}>{`Save Changes for ${currentPaletteId.name}`}</button>
        </div>}
        {!currentPaletteId && <form className="CreatePalette_form">
          <select onChange={(e) => this.handleCurrentProject(e.target.value)} >
            <option value="">Pick Project</option>
            {displayProjects}
          </select>
          <input
            type="text"
            placeholder="Palette Name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange} />
          <button onClick={this.handleSubmit}>Save Palette</button>
        </form>}
      </section>
    )
  }
}

const mapStateToProps = ({ currentProjects, currentPalette, currentPaletteId }) => ({
  currentProjects,
  currentPalette,
  currentPaletteId
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ setSelectedPalettes, clearSelectedPaletteId }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CreatePaletteForm);