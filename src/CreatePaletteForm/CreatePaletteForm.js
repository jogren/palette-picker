import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewPalette, getSelectedPalettes } from '../util/apiCalls';
import { setSelectedPalettes } from '../actions';
import { bindActionCreators } from 'redux';

class CreatePaletteForm extends Component {
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
    const { currentProjects, currentPalette} = this.props;
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
    console.log(updatePalettes)
    this.props.setSelectedPalettes(updatePalettes)
    this.setState({ name: "" })
  }

  render() {
    const { currentProjects } = this.props;
    let displayProjects = currentProjects.map(project => {
      return <option key={project.name} value={project.name}>{project.name}</option>
    })
    return (
      <section className="CreatePalette_section">
        <div>
          <button>Save Changes</button>
        </div>
        <form className="CreatePalette_form">
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
        </form>
      </section>
    )
  }
}

const mapStateToProps = ({ currentProjects, currentPalette }) => ({
  currentProjects,
  currentPalette
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ setSelectedPalettes }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CreatePaletteForm);