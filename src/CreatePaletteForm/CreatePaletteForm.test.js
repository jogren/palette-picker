import React from 'react';
import { shallow } from 'enzyme';
import { CreatePaletteForm } from './CreatePaletteForm';
import { postNewPalette, getSelectedPalettes } from '../util/apiCalls';
import { mapStateToProps, mapDispatchToProps } from './CreatePaletteForm';

jest.mock('../util/apiCalls');

describe('CreatePaletteForm', () => {
  let wrapper;
  let mockSetSelectedPalettes = jest.fn();
  let mockClearSelectedPaletteId = jest.fn();
  let mockHasErrored = jest.fn();
  let mockSetRandomPalette = jest.fn()
  const currentProjectsMock = [{
    id: 3,
    name: "Winter",
    created_at: "2019-10-10T19:13:08.873Z",
    updated_at: "2019-10-10T19:13:08.873Z",
  }]
  const currentPaletteMock = [
  {
    hexCode: "#25b25d",
    isLocked: false
  },
  {
    hexCode: "#25b25d",
    isLocked: false
  },
  {
    hexCode: "#25b25d",
    isLocked: false
  },
  {
    hexCode: "#25b25d",
    isLocked: false
  },
  {
    hexCode: "#25b25d",
    isLocked: false
  }
]

  beforeEach(() => {
    wrapper = shallow(<CreatePaletteForm 
      currentProjects={currentProjectsMock}
      currentPalette={currentPaletteMock}
      setSelectedPalettes={mockSetSelectedPalettes}
      clearSelectedPaletteId={mockClearSelectedPaletteId}
      hasErrored={mockHasErrored}
      setRandomPalette={mockSetRandomPalette}
      />)
  });

  it('should match the snapshot with the data passed through', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should update name state onChange of input', () => {
    wrapper.find('input').at(0).simulate('change', { target: { value: 'New Palette', name: 'name' } });
    expect(wrapper.state('name')).toEqual('New Palette')
  })

  it('should update currentProject state onChange of input', () => {
    wrapper.find('select').at(0).simulate('change', { target: { value: 'Project 1', name: 'currentProject' } });
    expect(wrapper.state('currentProject')).toEqual('Project 1')
  })

  it('should call clearSelectedPaletteId and setRandomPalette when reverEdits is called', () => {
    wrapper.instance().revertEdits();

    expect(mockClearSelectedPaletteId).toHaveBeenCalled();
    expect(mockSetRandomPalette).toHaveBeenCalled();
  })

  it('should run all items in the try when handleSubmit is called', async () => {
    let mockEvent = { preventDefault: () => {} };
    wrapper.setState({ currentProject: 'Winter' });

    wrapper.instance().handleSubmit(mockEvent);
    
    await expect(postNewPalette).toHaveBeenCalled();
    await expect(getSelectedPalettes).toHaveBeenCalled();
    expect(mockSetSelectedPalettes).toHaveBeenCalled();
    expect(wrapper.state('name')).toEqual("")
  })

  it('should run all items in the try when handleSaveEdits is called', async () => {
    wrapper.instance().handleSaveEdits();

    await expect(getSelectedPalettes).toHaveBeenCalled();
    await expect(mockSetSelectedPalettes).toHaveBeenCalled();
    expect(mockClearSelectedPaletteId).toHaveBeenCalled();
    expect(mockSetRandomPalette).toHaveBeenCalled();
  })

  it.skip('should call handleSaveEdits on button click', () => {
    wrapper.instance().handleSaveEdits = jest.fn();
    // wrapper.instance().forceUpdate();
    wrapper.find('button').first().simulate('click');
    expect(wrapper.instance().handleSaveEdits).toHaveBeenCalled()
  })
});