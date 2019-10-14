import React, { Component } from 'react';
import { postNewProject, getAllProjects, getSelectedPalettes, deleteProjectFromDB } from '../util/apiCalls';
import { setCurrentProjects, setSelectedPalettes } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
    } catch(error) {
      this.setState({ name: "" });
      this.setState({ hasErrored: error.message })
    }
  }

  handleProjectSelect = async (id) => {
    const { setSelectedPalettes } = this.props;
    const palettes = await getSelectedPalettes(id);
    if(!palettes.length) {
      setSelectedPalettes([])
    } else {
      setSelectedPalettes(palettes)
    }
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
          <button disabled={!this.state.name} onClick={this.handleSubmit}>Submit Project Name</button>
        </form>
        {this.state.hasErrored && <p>{this.state.hasErrored}</p>}
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