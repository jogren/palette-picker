import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewPalette, getSelectedPalettes, editPalette } from '../util/apiCalls';
import { setSelectedPalettes, clearSelectedPaletteId, hasErrored, setCurrentProjectId } from '../actions';
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
    const { currentProjects, currentPalette, setSelectedPalettes, hasErrored, setCurrentProjectId} = this.props;
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
    try {
      await postNewPalette(postPalette);
      const updatePalettes = await getSelectedPalettes(projectId);
      setCurrentProjectId(projectId);
      setSelectedPalettes(updatePalettes);
    } catch ({message}) {
      hasErrored(message);
    }
    this.props.setRandomPalette();
    this.setState({ name: "" });
  }

  handleSaveEdits = async () => {
    const { currentPalette, currentPaletteId, setSelectedPalettes, clearSelectedPaletteId, setRandomPalette, hasErrored } = this.props;
    const paletteToEdit = {
      color1: currentPalette[0].hexCode,
      color2: currentPalette[1].hexCode,
      color3: currentPalette[2].hexCode,
      color4: currentPalette[3].hexCode,
      color5: currentPalette[4].hexCode
    }
    try {
      await editPalette(paletteToEdit, currentPaletteId.id);
      const updatePalettes = await getSelectedPalettes(currentPaletteId.projectId);
      setSelectedPalettes(updatePalettes);
    } catch ({message}) {
      hasErrored(message);
    }
    clearSelectedPaletteId();
    setRandomPalette();
  }

  revertEdits = () => {
    const { clearSelectedPaletteId, setRandomPalette } = this.props;
    clearSelectedPaletteId();
    setRandomPalette();
  }

  render() {
    const { currentProjects, currentPaletteId } = this.props;
    let displayProjects = currentProjects.map((project, index) => {
      return <option key={`${project.name}-${index}`} value={project.name}>{project.name}</option>
    })
    return (
      <section className="CreatePalette_section">
        {currentPaletteId && <div className="div_selected-palette">
          <button onClick={this.handleSaveEdits}>{`Save Changes for ${currentPaletteId.name}`}</button>
          <button onClick={this.revertEdits}>Go Back</button>
        </div>}
        {!currentPaletteId && <form className="CreatePalette_form">
          <select onChange={(e) => this.handleCurrentProject(e.target.value)} >
            <option value="">Pick Project</option>
            {displayProjects}
          </select>
          <input
            type="text"
            placeholder="Palette Name..."
            name="name"
            value={this.state.name}
            onChange={this.handleChange} 
            autoComplete="off"/>
          <button disabled={!this.state.name || !this.state.currentProject} onClick={this.handleSubmit}>Save</button>
        </form>}
      </section>
    )
  }
}

export const mapStateToProps = ({ currentProjects, currentPalette, currentPaletteId }) => ({
  currentProjects,
  currentPalette,
  currentPaletteId
});

export const mapDispatchToProps = dispatch => (
  bindActionCreators({ setSelectedPalettes, clearSelectedPaletteId, hasErrored, setCurrentProjectId }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CreatePaletteForm);