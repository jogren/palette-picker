import React from 'react';
import { shallow } from 'enzyme';
import { CreatePaletteForm, mapStateToProps, mapDispatchToProps } from './CreatePaletteForm';
import { postNewPalette, getSelectedPalettes } from '../util/apiCalls';
import { setSelectedPalettes, clearSelectedPaletteId, hasErrored } from '../actions';

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
  });

  it('should update currentProject state onChange of input', () => {
    wrapper.find('select').at(0).simulate('change', { target: { value: 'Project 1', name: 'currentProject' } });
    expect(wrapper.state('currentProject')).toEqual('Project 1')
  });

  it('should call clearSelectedPaletteId and setRandomPalette when reverEdits is called', () => {
    wrapper.instance().revertEdits();

    expect(mockClearSelectedPaletteId).toHaveBeenCalled();
    expect(mockSetRandomPalette).toHaveBeenCalled();
  });

  it('should run all items in the try when handleSubmit is called', async () => {
    let mockEvent = { preventDefault: () => {} };
    wrapper.setState({ currentProject: 'Winter' });

    wrapper.instance().handleSubmit(mockEvent);
    
    await expect(postNewPalette).toHaveBeenCalled();
    await expect(getSelectedPalettes).toHaveBeenCalled();
    expect(mockSetSelectedPalettes).toHaveBeenCalled();
    expect(wrapper.state('name')).toEqual("")
  });

  it('should run all items in the try when handleSaveEdits is called', async () => {
    wrapper.instance().handleSaveEdits();

    await expect(getSelectedPalettes).toHaveBeenCalled();
    await expect(mockSetSelectedPalettes).toHaveBeenCalled();
    expect(mockClearSelectedPaletteId).toHaveBeenCalled();
    expect(mockSetRandomPalette).toHaveBeenCalled();
  });

  it.skip('should call handleSaveEdits on button click', () => {
    wrapper.instance().handleSaveEdits = jest.fn();
    // wrapper.instance().forceUpdate();
    wrapper.find('button').first().simulate('click');
    expect(wrapper.instance().handleSaveEdits).toHaveBeenCalled()
  });

  it('mapStateToProps should grab the props it needs', () => {
    const expected = {
      currentPalette: currentPaletteMock,
      currentProjects: currentProjectsMock,
      currentPaletteId: currentPaletteIdMock
    }

    const mappedProps = mapStateToProps(mockState);

    expect(mappedProps).toEqual(expected);
  });

  it('it calls dispatch with the setSelectedPalettes action', () => {
    const mockDispatch = jest.fn();
    const actionToDispatch = setSelectedPalettes(selectedPalettesMock);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.setSelectedPalettes(selectedPalettesMock);

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });

  it('it calls dispatch with the clearSelectedPaletteId action', () => {
    const mockDispatch = jest.fn();
    const actionToDispatch = clearSelectedPaletteId();
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.clearSelectedPaletteId();

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });

  it('it calls dispatch with the hasErrored action', () => {
    const mockDispatch = jest.fn();
    const actionToDispatch = hasErrored("Error retrieving projects");
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.hasErrored("Error retrieving projects");

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });
});