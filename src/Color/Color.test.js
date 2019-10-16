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
      isLocked={true}
      toggleLock={toggleLockMock} />)
  });

  it('should match the snapshot with the data passed through and isLocked as true', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot with the data passed through and isLocked as false', () => {
    wrapper = shallow(<Color
      color={colorMock}
      isLocked={false}
      toggleLock={toggleLockMock} />)
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the toggleLock method when the color is clicked', () => {
    wrapper.find('article').simulate('click');
    expect(toggleLockMock).toHaveBeenCalled();
  });
});