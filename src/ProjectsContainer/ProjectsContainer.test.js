import React from 'react';
import { shallow } from 'enzyme';
import { ProjectsContainer } from './ProjectsContainer';
import { setCurrentProjects, setSelectedPalettes } from '../actions';

describe('ProjectsContainer', () => {
  let wrapper;
  const setSelectedPalettesMock = jest.fn();
  const setCurrentProjectsMock = jest.fn();
  const currentProjectsMock = [{
    id: 3,
    name: "Winter",
    created_at: "2019-10-10T19:13:08.873Z",
    updated_at: "2019-10-10T19:13:08.873Z",
  }]

  beforeEach(() => {
    wrapper = shallow(<ProjectsContainer
      setCurrentProjects={setCurrentProjectsMock}
      setSelectedPalettes={setSelectedPalettesMock}
      currentProjects={currentProjectsMock}
      />)
  });
  
  it('should match the snapshot with the data passed through', () => {
    expect(wrapper).toMatchSnapshot();
  });
});