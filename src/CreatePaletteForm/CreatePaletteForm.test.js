import React from 'react';
import { shallow } from 'enzyme';
import { CreatePaletteForm } from './CreatePaletteForm';

describe('CreatePaletteForm', () => {
  let wrapper;
  const currentProjectsMock = [{
    id: 3,
    name: "Winter",
    created_at: "2019-10-10T19:13:08.873Z",
    updated_at: "2019-10-10T19:13:08.873Z",
  }]
  const currentPaletteMock = [{
    hexCode: "#25b25d",
    isLocked: false
  }]

  beforeEach(() => {
    wrapper = shallow(<CreatePaletteForm 
      currentProjects={currentProjectsMock}
      currentPalette={currentPaletteMock}
      />)
  });

  it('should match the snapshot with the data passed through', () => {
    expect(wrapper).toMatchSnapshot();
  });
});