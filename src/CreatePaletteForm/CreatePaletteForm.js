import React, { Component } from 'react';

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

  render() {
    return (
      <form>
        <select>
          <option value="projects">projects</option>
        </select>
        <input
          type="text"
          placeholder="Palette Name"
          name="name"
          value={this.state.name}
          onChange={this.handleChange} />
        <button>Save Palette</button>
      </form>
    )
  }
}

export default CreatePaletteForm;