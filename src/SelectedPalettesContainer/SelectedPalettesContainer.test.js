import React from 'react';
import { shallow } from 'enzyme';
import SelectedPalettesContainer from './SelectedPalettesContainer';

describe('SelectedPalettesContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SelectedPalettesContainer/>)
  });

  it('should match the snapshot with the data passed through', () => {
    expect(wrapper).toMatchSnapshot();
  });
});