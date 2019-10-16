import React from 'react';
import { shallow } from 'enzyme';
import { CurrentColors, mapStateToProps } from './CurrentColors';

describe('CurrentColors', () => {
  let wrapper;
  const currentPaletteMock = [{
    hexCode: "#25b25d",
    isLocked: false
  }]
  const selectedPalettesMock = [{
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
  }]
  const currentProjectsMock = [{
    id: 13,
    name: '123456',
    created_at: '2019-10-13T17:40:38.824Z',
    updated_at: '2019-10-13T17:40:38.824Z'
  }]
  const currentPaletteIdMock = {
    id: 49,
    name: '12345',
    projectId: 13
  }
  const mockState = {
    currentPalette: currentPaletteMock,
    currentProjects: currentProjectsMock,
    selectedPalettes: selectedPalettesMock,
    currentPaletteId: currentPaletteIdMock,
    errorMsg: ""
  }

  beforeEach(() => {
    wrapper = shallow(<CurrentColors
      currentPalette={currentPaletteMock}
    />)
  });

  it('should match the snapshot with the data passed through', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('mapStateToProps should grab the props it needs', () => {
    const expected = {
      currentPalette: currentPaletteMock
    }

    const mappedProps = mapStateToProps(mockState);

    expect(mappedProps).toEqual(expected);
  });
});