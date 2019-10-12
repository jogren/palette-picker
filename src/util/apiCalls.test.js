import { getAllProjects, getSelectedPalettes } from './apiCalls';

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

describe('getSelectedPalettes', () => {
  let mockPalettes;
  let mockId;

  beforeEach(() => {
    mockId = 3;
    mockPalettes = [[
      {
        id: 4,
        name: 'Christmas Theme',
        project_id: 3,
        created_at: '2019-10-10T19:13:08.947Z',
        updated_at: '2019-10-10T19:13:08.947Z',
        color1: '#800000',
        color2: '#228B22',
        color3: '#FFFFFF',
        color4: '#FFFFFF',
        color5: '#FFFFFF'
      },
      {
        id: 5,
        name: 'Hanukkah Theme',
        project_id: 3,
        created_at: '2019-10-10T19:13:08.950Z',
        updated_at: '2019-10-10T19:13:08.950Z',
        color1: '#C0C0C0',
        color2: '#3895D3',
        color3: '#FFFFFF',
        color4: '#FFFFFF',
        color5: '#FFFFFF'
      }
    ]]

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPalettes)
      })
    })
  });

  it('should call fetch with the correct url', () => {
    getSelectedPalettes(mockId);

    expect(window.fetch).toHaveBeenCalledWith(`https://palette-picker-api-sfjo.herokuapp.com/api/v1/palettes?project_id=${mockId}`);
  });

  it('should return an array of all palettes for a select project_id', () => {
    expect(getSelectedPalettes(mockId)).resolves.toEqual(mockPalettes);
  });

  it('should return an error if the promise resolves but the property ok isn\'t true', () => {
    window.fetch = jest.fn()
      .mockImplementation(() => {
        return Promise.resolve({
          ok: false
        })
      })

    expect(getSelectedPalettes(mockId)).rejects.toEqual(Error('There was an issue getting your palettes'))
  });

  it('should return an error if the promise rejects', () => {
    window.fetch = jest.fn()
      .mockImplementation(() => {
        return Promise.reject(Error('Failed to fetch palettes'))
      })

    expect(getSelectedPalettes(mockId)).rejects.toEqual(Error('Failed to fetch palettes'))
  });
});