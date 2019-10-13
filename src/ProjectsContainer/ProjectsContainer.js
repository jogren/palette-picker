import React, { Component } from 'react';
import { postNewProject, getAllProjects, getSelectedPalettes, deleteProjectFromDB } from '../util/apiCalls';
import { setCurrentProjects, setSelectedPalettes } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export class ProjectsContainer extends Component {
  constructor() {
    super();
    this.state = {
      name: ""
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = async (e) => {
    const { name } = this.state;
    const { setCurrentProjects } = this.props;
    e.preventDefault();
    await postNewProject(name);
    const projects = await getAllProjects();
    setCurrentProjects(projects)
    this.setState({ name: "" });
  }

  handleProjectSelect = async (id) => {
    const palettes = await getSelectedPalettes(id);
    this.props.setSelectedPalettes(palettes)
  }

  deleteProject = async (id) => {
    const { setCurrentProjects } = this.props;
    await deleteProjectFromDB(id)
    const projects = await getAllProjects();
    setCurrentProjects(projects)
  }

  render() {
    const { currentProjects } = this.props;
    let projectList = currentProjects.map((project, index) => {
      console.log(project)
      return <div key={index}>
          <button className="project-name" onClick={() => this.handleProjectSelect(project.id)}>{project.name}</button>
          <button onClick={() => this.deleteProject(project.id)}>x</button>
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
          <button onClick={this.handleSubmit}>Submit Project Name</button>
        </form>
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
  bindActionCreators({ setCurrentProjects, setSelectedPalettes }, dispatch)
)
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);