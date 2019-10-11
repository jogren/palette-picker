import React, { Component } from 'react';
import { postNewProject } from '../util/apiCalls';
import { connect } from 'react-redux';

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

  handleSubmit = (e) => {
    const { name } = this.state;
    e.preventDefault();
    postNewProject(name);

    this.setState({ name: "" });

  }

  render() {
    const { currentProjects } = this.props;
    let projectList = currentProjects.map(project => {
      return <p>{project.name}</p>
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
        <div>
          {projectList}
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({ currentProjects }) => ({
  currentProjects
})

export default connect(mapStateToProps)(ProjectsContainer);