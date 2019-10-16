import React, { Component } from 'react';
import { postNewProject, getAllProjects, getSelectedPalettes, deleteProjectFromDB } from '../util/apiCalls';
import { setCurrentProjects, setSelectedPalettes, hasErrored } from '../actions';
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
    const { setSelectedPalettes, hasErrored } = this.props;
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
    const { setCurrentProjects, hasErrored } = this.props;
    try {
      await deleteProjectFromDB(id);
      const projects = await getAllProjects();
      setCurrentProjects(projects);
    } catch ({message}) {
      hasErrored(message)
    }
  }

  render() {
    const { currentProjects } = this.props;
    let projectList = currentProjects.map((project, index) => {
      return <div key={index}>
          <button className="project-name" onClick={() => this.handleProjectSelect(project.id)}>{project.name}</button>
        <button className="trash-btn" onClick={() => this.deleteProject(project.id)}><FiTrash2 className="trash-img-project" /></button>
        </div>
    })
    return (
      <section className="ProjectsContainer_section">
        <form>
          <input 
            type="text"
            placeholder="New Project's Name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange} />
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

const mapStateToProps = ({ currentProjects }) => ({
  currentProjects
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ setCurrentProjects, setSelectedPalettes, hasErrored }, dispatch)
)
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);