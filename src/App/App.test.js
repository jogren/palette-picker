import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import { setCurrentPalette, setCurrentProjects, setSelectedPalettes, setCurrentPaletteId, hasErrored } from '../actions';
import { getAllProjects, deletePaletteFromDB, getSelectedPalettes } from '../util/apiCalls';

jest.mock('../util/apiCalls');

getAllProjects.mockImplementation(() => {
  return Promise.resolve([{
    id: 25,
    name: 'Mountains',
    created_at: '2019-10-15T21:40:24.372Z',
    updated_at: '2019-10-15T21:40:24.372Z'
  }])
});

deletePaletteFromDB.mockImplementation(() => {
  return Promise.resolve()
});

getSelectedPalettes.mockImplementation(() => {
  return Promise.resolve([{
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
  }])
});

describe('App', () => {
  let wrapper;
  const setCurrentPaletteMock = jest.fn();
  const setCurrentProjectsMock = jest.fn();
  const setSelectedPalettesMock = jest.fn();
  const setCurrentPaletteIdMock = jest.fn();
  const hasErroredMock = jest.fn();
  const currentPaletteMock = [{
    hexCode: "#25b25d",
    isLocked: false
  }];
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
    wrapper = shallow(<App 
      setCurrentPalette={setCurrentPaletteMock}
      setCurrentProjects={setCurrentProjectsMock}
      currentPalette={currentPaletteMock}
      selectedPalettes={selectedPalettesMock}
      setSelectedPalettes={setSelectedPalettesMock}
      setCurrentPaletteId={setCurrentPaletteIdMock}
      hasErrored={hasErroredMock} 
      />)
  });

  it('should match the snapshot with the data passed through', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call setCurrentPalette when toggleLock is called', () => {
    expect(wrapper.state('lockMessage')).toEqual(true);

    wrapper.instance().toggleLock("#82ea46");
    
    expect(wrapper.state('lockMessage')).toEqual(false)
    expect(setCurrentPaletteMock).toHaveBeenCalled();
  })

  it('should call deletePaletteFromDB, getSelectedPalettes and setSelectedPalettes when deletePalette', async () => {
    wrapper.instance().deletePalette(1, 1);
    await expect(deletePaletteFromDB).toHaveBeenCalled();
    await expect(getSelectedPalettes).toHaveBeenCalled();
    expect(setSelectedPalettesMock).toHaveBeenCalled();
  })

  it('should call hasErrored when the promise is rejected', async () => {
    deletePaletteFromDB.mockImplementation(() => {
      throw Error('new error')
    })
    await wrapper.instance().deletePalette(1, 2);

    expect(hasErroredMock).toHaveBeenCalled();
  })


  it('should call setCurrentPaletteId and setCurrentPalette when editPalette is called', () => {
    wrapper.instance().editPalette(49);

    expect(setCurrentPaletteIdMock).toHaveBeenCalled();
    expect(setCurrentPaletteMock).toHaveBeenCalled();
  })

  it('mapStateToProps should grab the props it needs', () => {
    const expected = {
      currentPalette: currentPaletteMock,
      selectedPalettes: selectedPalettesMock
    }

    const mappedProps = mapStateToProps(mockState);

    expect(mappedProps).toEqual(expected);
  });

  it('it calls dispatch with the setCurrentPalette action', () => {
    const mockDispatch = jest.fn();
    const actionToDispatch = setCurrentPalette(currentPaletteMock);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.setCurrentPalette(currentPaletteMock);

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });

  it('it calls dispatch with the setCurrentProjects action', () => {
    const mockDispatch = jest.fn();
    const actionToDispatch = setCurrentProjects(currentProjectsMock);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.setCurrentProjects(currentProjectsMock);

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });

  it('it calls dispatch with the setSelectedPalettes action', () => {
    const mockDispatch = jest.fn();
    const actionToDispatch = setSelectedPalettes(selectedPalettesMock);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.setSelectedPalettes(selectedPalettesMock);

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });

  it('it calls dispatch with the setCurrentPaletteId action', () => {
    const mockDispatch = jest.fn();
    const actionToDispatch = setCurrentPaletteId(currentPaletteIdMock);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.setCurrentPaletteId(currentPaletteIdMock);

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });

  it('it calls dispatch with the hasErrored action', () => {
    const mockDispatch = jest.fn();
    const actionToDispatch = hasErrored("Error retrieving projects");
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.hasErrored("Error retrieving projects");

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });

  it('should call deletePaletteFromDB when deletePalette is called', async () => {
    wrapper.instance().deletePalette(1, 1);
    expect(deletePaletteFromDB).toHaveBeenCalled();
  });

  it('should call getSelectedPalettes when deletePalette is called', async () => {
    wrapper.instance().deletePalette(1, 1);
    expect(getSelectedPalettes).toHaveBeenCalled();
  });
});
