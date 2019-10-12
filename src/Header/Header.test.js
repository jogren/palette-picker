import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header', () => {
  let wrapper;
  const generateColorsMock = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<Header 
      generateColors={generateColorsMock}
      />)
  });

  it('should match the snapshot with the data passed through', () => {
    expect(wrapper).toMatchSnapshot();
  });
});