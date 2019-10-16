import React from 'react';
import { shallow } from 'enzyme';
import { SelectedPalettesContainer, mapStateToProps } from './SelectedPalettesContainer';

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
  }];
  const currentPaletteMock = [{
    hexCode: "#25b25d",
    isLocked: false
  }];
  const currentProjectsMock = [{
    id: 13,
    name: '123456',
    created_at: '2019-10-13T17:40:38.824Z',
    updated_at: '2019-10-13T17:40:38.824Z'
  }];
  const currentPaletteIdMock = {
    id: 49,
    name: '12345',
    projectId: 13
  };
  const mockState = {
    currentPalette: currentPaletteMock,
    currentProjects: currentProjectsMock,
    selectedPalettes: selectedPalettesMock,
    currentPaletteId: currentPaletteIdMock,
    errorMsg: ""
  }

  beforeEach(() => {
    wrapper = shallow(<SelectedPalettesContainer
      deletePalette={deletePaletteMock}
      selectedPalettes={selectedPalettesMock}
      />)
  });

  it('should match the snapshot with the data passed through', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('mapStateToProps should grab the props it needs', () => {
    const expected = {
      selectedPalettes: selectedPalettesMock
    }

    const mappedProps = mapStateToProps(mockState);

    expect(mappedProps).toEqual(expected);
  });
});