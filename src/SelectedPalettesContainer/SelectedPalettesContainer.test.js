import React from 'react';
import { shallow } from 'enzyme';
import { SelectedPalettesContainer } from './SelectedPalettesContainer';

describe('SelectedPalettesContainer', () => {
  let wrapper;
  const deletePaletteMock = jest.fn();
  const selectedPalettesMock = [{
    id: 21,
    name: 'palette',
    project_id: 7,
    created_at: '2019-10-12T23:36:53.454Z',
    updated_at: '2019-10-12T23:36:53.454Z',
    color1: '#5fd849',
    color2: '#878dff',
    color3: '#efa58b',
    color4: '#f2bf59',
    color5: '#f73722'
  }]

  beforeEach(() => {
    wrapper = shallow(<SelectedPalettesContainer
      deletePalette={deletePaletteMock}
      selectedPalettes={selectedPalettesMock}
      />)
  });

  it('should match the snapshot with the data passed through', () => {
    expect(wrapper).toMatchSnapshot();
  });
});