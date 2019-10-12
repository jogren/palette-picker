import { getAllProjects } from './apiCalls';

describe('getAllProjects', () => {
  let mockProjects;

  beforeEach(() => {
    mockProjects = [{
      id: 3,
      name: 'Winter',
      created_at: '2019-10-10T19:13:08.873Z',
      updated_at: '2019-10-10T19:13:08.873Z'
    }]

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProjects)
      })
    })
  });

  it('should call fetch with the correct url', () => {
    getAllProjects();
    
    expect(window.fetch).toHaveBeenCalledWith('https://palette-picker-api-sfjo.herokuapp.com/api/v1/projects');
  });

  it('should return an array of all projects', () => {
    expect(getAllProjects()).resolves.toEqual(mockProjects);
  });

  it('should return an error if the promise resolves but the property ok isn\'t true', () => {
    window.fetch = jest.fn()
    .mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    })

    expect(getAllProjects()).rejects.toEqual(Error('There was an issue getting your projects'))
  });

  it('should return an error if the promise rejects', () => {
    window.fetch = jest.fn()
    .mockImplementation(() => {
      return Promise.reject(Error('Failed to fetch projects'))
    })

    expect(getAllProjects()).rejects.toEqual(Error('Failed to fetch projects'))
  });
});