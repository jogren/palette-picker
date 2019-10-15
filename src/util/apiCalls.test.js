import { getAllProjects, getSelectedPalettes, postNewProject, postNewPalette, deletePaletteFromDB, deleteProjectFromDB, editPalette } from './apiCalls';

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

describe('postNewProject', () => {
  let mockProject;
  let mockName;
  let options;

  beforeEach(() => {
    mockName = 'Winter';
    mockProject = {
      name: 'Winter'
    }
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: mockName })
    }

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProject)
      })
    })
  });

  it('should call fetch with the correct url', () => {
    postNewProject(mockName);

    expect(window.fetch).toHaveBeenCalledWith('https://palette-picker-api-sfjo.herokuapp.com/api/v1/projects', options);
  });

  it('should return a new response project', () => {
    expect(postNewProject(mockName)).resolves.toEqual(mockProject);
  });

  it('should return an error if the promise resolves but the property ok isn\'t true', () => {
    window.fetch = jest.fn()
      .mockImplementation(() => {
        return Promise.resolve({
          ok: false
        })
      })

    expect(postNewProject(mockName)).rejects.toEqual(Error('Project name already exists'))
  });

  it('should return an error if the promise rejects', () => {
    window.fetch = jest.fn()
      .mockImplementation(() => {
        return Promise.reject(Error('Failed to post project'))
      })

    expect(postNewProject(mockName)).rejects.toEqual(Error('Failed to post project'))
  });
});

describe('postNewPalette', () => {
  let mockPalette;
  let options;

  beforeEach(() => {
    mockPalette = {
      name: 'mint',
      project_id: 4,
      color1: '#98ff98',
      color2: '#98ff98',
      color3: '#98ff98',
      color4: '#98ff98',
      color5: '#98ff98'
    }
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mockPalette)
    }

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPalette)
      })
    })
  });

  it('should call fetch with the correct url', () => {
    postNewPalette(mockPalette);

    expect(window.fetch).toHaveBeenCalledWith('https://palette-picker-api-sfjo.herokuapp.com/api/v1/palettes', options);
  });

  it('should return a new response project', () => {
    expect(postNewPalette(mockPalette)).resolves.toEqual(mockPalette);
  });

  it('should return an error if the promise resolves but the property ok isn\'t true', () => {
    window.fetch = jest.fn()
      .mockImplementation(() => {
        return Promise.resolve({
          ok: false
        })
      })

    expect(postNewPalette(mockPalette)).rejects.toEqual(Error('There was an issue posting your palette'))
  });

  it('should return an error if the promise rejects', () => {
    window.fetch = jest.fn()
      .mockImplementation(() => {
        return Promise.reject(Error('Failed to post palette'))
      })

    expect(postNewPalette(mockPalette)).rejects.toEqual(Error('Failed to post palette'))
  });
});

describe('deletePaletteFromDB', () => {
  let options;

  beforeEach(() => {
    options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve()
      })
    })
  });

  it('should call fetch with the correct url', () => {
    deletePaletteFromDB(1);

    expect(window.fetch).toHaveBeenCalledWith('https://palette-picker-api-sfjo.herokuapp.com/api/v1/palettes/1', options);
  });

  it('should return nothing', () => {
    expect(deletePaletteFromDB(1)).resolves.toEqual();
  });

  it('should return an error if the promise resolves but the property ok isn\'t true', () => {
    window.fetch = jest.fn()
      .mockImplementation(() => {
        return Promise.resolve({
          ok: false
        })
      })

    expect(deletePaletteFromDB(1)).rejects.toEqual(Error('There was an error deleting that palette'))
  });

  it('should return an error if the promise rejects', () => {
    window.fetch = jest.fn()
      .mockImplementation(() => {
        return Promise.reject(Error('Failed to delete palette'))
      })

    expect(deletePaletteFromDB(1)).rejects.toEqual(Error('Failed to delete palette'))
  });
});

