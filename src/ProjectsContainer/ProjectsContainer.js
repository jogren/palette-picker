import React, { Component } from 'react';
import { postNewProject, getAllProjects, getSelectedPalettes, deleteProjectFromDB } from '../util/apiCalls';
import { setCurrentProjects, setSelectedPalettes, hasErrored, setCurrentProjectId } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FiTrash2 } from 'react-icons/fi';

export class ProjectsContainer extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      hasErrored: ""
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    this.setState({ hasErrored: "" })
  }

  handleSubmit = async (e) => {
    const { name } = this.state;
    const { setCurrentProjects } = this.props;
    e.preventDefault();
    try {
      await postNewProject(name);
      const projects = await getAllProjects();
      setCurrentProjects(projects)
      this.setState({ name: "" });
    } catch({message}) {
      this.setState({ name: "" });
      this.setState({ hasErrored: message })
    }
  }

  handleProjectSelect = async (id) => {
    const { setSelectedPalettes, hasErrored, setCurrentProjectId } = this.props;
    setCurrentProjectId(id);
    this.setState({ currentProjectId: id })
    try {
      const palettes = await getSelectedPalettes(id);
      if (!palettes.length) {
        setSelectedPalettes([])
      } else {
        setSelectedPalettes(palettes)
      }
    } catch({message}) {
      hasErrored(message)
    }
  }

  deleteProject = async (id) => {
    const { setCurrentProjects, hasErrored, setSelectedPalettes } = this.props;
    try {
      await deleteProjectFromDB(id);
      const projects = await getAllProjects();
      setCurrentProjects(projects);
      setSelectedPalettes([])
    } catch ({message}) {
      hasErrored(message)
    }
  }

  render() {
    const { currentProjects, currentProjectId } = this.props;
    let projectList = currentProjects.map((project, index) => {
      let projectClass = project.id === currentProjectId ? 'button_selected-Project' : 'project-name'
      return <div key={index} className="div_buttons-container">
        <button className={projectClass} id="button_project-name" onClick={() => this.handleProjectSelect(project.id)}>{project.name}</button>
        <button className="trash-btn" onClick={() => this.deleteProject(project.id)}><FiTrash2 className="trash-img-project" /></button>
        </div>
    })
    return (
      <section className="ProjectsContainer_section">
        <form>
          <label htmlFor="create-project">Create a Project</label>
          <input 
            id="create-project"
            type="text"
            placeholder="Enter Name..."
            name="name"
            value={this.state.name}
            onChange={this.handleChange} 
            autoComplete="off"/>
          <button disabled={!this.state.name} onClick={this.handleSubmit}>Submit Project Name</button>
        </form>
        <div className="error">
        {this.state.hasErrored && <p className="error-text">{this.state.hasErrored}</p>}
        </div>
        <div className="div_project-name-container">
          {projectList}
        </div>
      </section>
    )
  }
}

export const mapStateToProps = ({ currentProjects, currentProjectId }) => ({
  currentProjects,
  currentProjectId
})

export const mapDispatchToProps = dispatch => (
  bindActionCreators({ setCurrentProjects, setSelectedPalettes, hasErrored, setCurrentProjectId }, dispatch)
)
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);