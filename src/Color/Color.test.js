import React from 'react';
import { shallow } from 'enzyme';
import Color from './Color';

describe('Color', () => {
  let wrapper;
  const toggleLockMock = jest.fn();
  const colorMock = { 
    backgroundColor: "#FFFFFF"
  };

  beforeEach(() => {
    wrapper = shallow(<Color 
      color={colorMock}
      toggleLock={toggleLockMock} />)
  });

  it('should match the snapshot with the data passed through', () => {
    expect(wrapper).toMatchSnapshot();
  });
});