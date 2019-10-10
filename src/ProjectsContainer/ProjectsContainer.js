import React, { Component } from 'react';

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

  render() {
    return (
      <section>
        <form>
          <input 
            type="text"
            placeholder="New Project's Name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange} />
          <button>Submit Project Name</button>
        </form>
        <div>
          <p>Project 1</p>
        </div>
      </section>
    )
  }
}

export default ProjectsContainer;