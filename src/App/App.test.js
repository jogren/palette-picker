import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import { setCurrentPalette, setCurrentProjects } from '../actions';

describe('App', () => {
  let wrapper;
  const setCurrentPaletteMock = jest.fn();
  const setCurrentProjectsMock = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<App 
      setCurrentPalette={setCurrentPaletteMock}
      setCurrentProjects={setCurrentProjectsMock} />)
  });

  it('should match the snapshot with the data passed through', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
