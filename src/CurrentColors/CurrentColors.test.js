import React from 'react';
import { shallow } from 'enzyme';
import { CurrentColors } from './CurrentColors';

describe('CurrentColors', () => {
  let wrapper;
  const currentPaletteMock = [{
    hexCode: "#25b25d",
    isLocked: false
  }]

  beforeEach(() => {
    wrapper = shallow(<CurrentColors
      currentPalette={currentPaletteMock}
    />)
  });

  it('should match the snapshot with the data passed through', () => {
    expect(wrapper).toMatchSnapshot();
  });
});