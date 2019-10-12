import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import { setCurrentPalette, setCurrentProjects } from '../actions';

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
