import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import { setCurrentPalette, setCurrentProjects, setSelectedPalettes, setCurrentPaletteId, hasErrored } from '../actions';
import { getAllProjects, deletePaletteFromDB, getSelectedPalettes } from '../util/apiCalls';

jest.mock('../../util/apiCalls');

getAllProjects.mockImplementation(() => {
  return Promise.resolve([{
    id: 25,
    name: 'Mountains',
    created_at: '2019-10-15T21:40:24.372Z',
    updated_at: '2019-10-15T21:40:24.372Z'
  }])
});

deletePaletteFromDB.mockImplementation(() => {
  return Promise.resolve()
});

getSelectedPalettes.mockImplementation(() => {
  return Promise.resolve([{
    id: 49,
    name: '12345',
    project_id: 13,
    created_at: '2019-10-16T00:35:10.929Z',
    updated_at: '2019-10-16T00:35:10.929Z',
    color1: '#3890af',
    color2: '#1aaf38',
    color3: '#a567c6',
    color4: '#fcf4a1',
    color5: '#7a35c4'
  }])
});

describe('App', () => {
  let wrapper;
  const setCurrentPaletteMock = jest.fn();
  const setCurrentProjectsMock = jest.fn();
  const currentPaletteMock = [{
    hexCode: "#25b25d",
    isLocked: false
  }]
  
  beforeEach(() => {
    wrapper = shallow(<App 
      setCurrentPalette={setCurrentPaletteMock}
      setCurrentProjects={setCurrentProjectsMock}
      currentPalette={currentPaletteMock} 
      />)
  });

  it('should match the snapshot with the data passed through', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
