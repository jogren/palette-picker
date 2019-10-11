import React, { Component } from 'react';
import { connect } from 'react-redux';

class CreatePaletteForm extends Component {
  constructor() {
    super();
    this.state = {
      name: ""
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
  }

  render() {
    const { currentProjects } = this.props;
    let displayProjects = currentProjects.map(project => {
      return <option value={project.name}>{project.name}</option>
    })
    return (
      <form>
        <select>
          <option>Pick Project</option>
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
    )
  }
}

const mapStateToProps = ({ currentProjects }) => ({
  currentProjects
})

export default connect(mapStateToProps)(CreatePaletteForm);