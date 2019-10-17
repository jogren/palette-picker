import React from 'react';
import { shallow } from 'enzyme';
import { ProjectsContainer } from './ProjectsContainer';
import { setCurrentProjects, setSelectedPalettes, hasErrored } from '../actions';
import { postNewProject, getAllProjects, getSelectedPalettes, deleteProjectFromDB } from '../util/apiCalls';
import { mapStateToProps, mapDispatchToProps } from './ProjectsContainer';


jest.mock('../util/apiCalls');

describe('ProjectsContainer', () => {
  let wrapper;
  const setSelectedPalettesMock = jest.fn();
  const setCurrentProjectsMock = jest.fn();
  const hasErroredMock = jest.fn();
  const setCurrentProjectIdMock = jest.fn();
  const currentProjectsMock = [{
    id: 3,
    name: "Winter",
    created_at: "2019-10-10T19:13:08.873Z",
    updated_at: "2019-10-10T19:13:08.873Z",
  }];

  beforeEach(() => {
    wrapper = shallow(<ProjectsContainer
      setCurrentProjects={setCurrentProjectsMock}
      setSelectedPalettes={setSelectedPalettesMock}
      currentProjects={currentProjectsMock}
      hasErrored={hasErroredMock}
      setCurrentProjectId={setCurrentProjectIdMock}
      />)
  });
  
  it('should match the snapshot with the data passed through', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should update name and hasErrored state onChange of input', () => {
    wrapper.find('input').at(0).simulate('change', { target: { value: 'New Project', name: 'name' } });
    expect(wrapper.state('name')).toEqual('New Project');
    expect(wrapper.state('hasErrored')).toEqual("");
  });

  it('should invoke postNewProject, getAllProjects and setCurrentProjects when promise resolves', async () => {
    const mockEvent = { preventDefault: jest.fn() }
    wrapper.instance().handleSubmit(mockEvent);

    await expect(postNewProject).toHaveBeenCalled();
    await expect(getAllProjects).toHaveBeenCalled();
    expect(setCurrentProjectsMock).toHaveBeenCalled();
    expect(wrapper.state('name')).toEqual("");
  });

  it('should update state if promise rejects after handleSubmit call', async () => {
    const mockEvent = { preventDefault: jest.fn() }

    postNewProject.mockImplementation(() => {
      throw Error('new error')
    })
    await wrapper.instance().handleSubmit(mockEvent);

    expect(wrapper.state('name')).toEqual("");
    expect(wrapper.state('hasErrored')).toEqual("new error");
  });

  it('should call getSelectedPalettes when handleProjectSelect is invoked and promise resolves', async () => {
    wrapper.instance().handleProjectSelect(3);

    expect(setCurrentProjectIdMock).toHaveBeenCalledWith(3);
    await expect(getSelectedPalettes).toHaveBeenCalledWith(3);
  });

  it('should call hasErrored when handleProjectSelect is called and a promise rejects', async () => {
    getSelectedPalettes.mockImplementation(() => {
      throw Error('new error')
    })
    await wrapper.instance().handleProjectSelect(1);

    expect(hasErroredMock).toHaveBeenCalledWith('new error')
  });

  it('should invoke deleteProjectFromDB, getAllProjects and setCurrentProjects when deleteProject is invoked', async () => {
    wrapper.instance().deleteProject(3);

    await expect(deleteProjectFromDB).toHaveBeenCalledWith(3);
    await expect(getAllProjects).toHaveBeenCalled();
    expect(setCurrentProjectsMock).toHaveBeenCalled();
  });
});

describe('mapDispatchToProps', () => {
  it('should call dispatch with an setCurrentProjects action', () => {
    // Setup
    const mockDispatch = jest.fn();
    const actionToDispatch = setCurrentProjects([{ name: 'palette'}]);

    // Execution
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.setCurrentProjects([{ name: 'palette' }]);

    // Expectaion
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });

  it('should call dispatch with an setSelectedPalettes action', () => {
    // Setup
    const mockDispatch = jest.fn();
    const actionToDispatch = setSelectedPalettes({ name: 'palette' });

    // Execution
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.setSelectedPalettes({ name: 'palette' });

    // Expectaion
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });

  it('should call dispatch with an hasErrored action', () => {
    // Setup
    const mockDispatch = jest.fn();
    const actionToDispatch = hasErrored('There was an error');

    // Execution
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.hasErrored('There was an error');

    // Expectaion
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });
});

describe('mapStateToProps', () => {
  it('should return an array with the currentProjects', () => {
    // Setup
    const mockState = {
      currentProjects: [{ name: 'Project 1', id: 1 }],
      currentPalette: ['color1', 'color2', 'color3', 'color4', 'color5'],
      selectedPalettes: ['selectedPalettes'],
      currentPaletteId: null,
      errorMsg: "",
      
    };
    const expected = {
      currentProjects: [{ name: 'Project 1', id: 1 }],
    };

    // Execution
    const mappedProps = mapStateToProps(mockState);

    // Expectation
    expect(mappedProps).toEqual(expected);
  });
});