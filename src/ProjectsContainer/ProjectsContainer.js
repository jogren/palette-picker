import React, { Component } from 'react';
import { postNewProject, getAllProjects } from '../util/apiCalls';
import { setCurrentProjects } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ProjectsContainer extends Component {
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
    console.log(projects)
    setCurrentProjects(projects)
    this.setState({ name: "" });

  }

  render() {
    const { currentProjects } = this.props;
    let projectList = currentProjects.map(project => {
      return <button>{project.name}</button>
    })
    return (
      <section>
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
  bindActionCreators({ setCurrentProjects }, dispatch)
)
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);