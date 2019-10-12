import * as actions from './index';

describe('actions', () => {
  it('should have a type of SET_PALETTE', () => {
    const mockPalettes = [
      {
      hexCode: '#cc9639',
      isLocked: false
      },
      {
        hexCode: '#077c96',
        isLocked: false
      }
    ];
    const expectedAction = {
      type: 'SET_PALETTE',
      colors: [
        {
        hexCode: '#cc9639',
        isLocked: false
        },
        {
          hexCode: '#077c96',
          isLocked: false
        }
      ]
    }

    const result = actions.setCurrentPalette(mockPalettes);

    expect(result).toEqual(expectedAction);
  });

  it('should have a type of SET_PROJECTS', () => {
    const mockProjects = [{
      id: 3,
      name: 'Winter',
      created_at: '2019-10-10T19:13:08.873Z',
      updated_at: '2019-10-10T19:13:08.873Z'
    }];
    const expectedAction = {
      type: 'SET_PROJECTS',
      projects: [{
        id: 3,
        name: 'Winter',
        created_at: '2019-10-10T19:13:08.873Z',
        updated_at: '2019-10-10T19:13:08.873Z'
      }]
    }

    const result = actions.setCurrentProjects(mockProjects);

    expect(result).toEqual(expectedAction);
  });

  it('should have a type of SELECTED_PALETTES', () => {
    const mockPalettes = [{
      id: 5,
      name: 'palette',
      project_id: 3,
      created_at: '2019-10-10T19:13:08.950Z',
      updated_at: '2019-10-10T19:13:08.950Z',
      color1: '#C0C0C0',
      color2: '#3895D3',
      color3: '#FFFFFF',
      color4: '#FFFFFF',
      color5: '#FFFFFF'
    }];
    const expectedAction = {
      type: 'SELECTED_PALETTES',
      palettes: [{
        id: 5,
        name: 'palette',
        project_id: 3,
        created_at: '2019-10-10T19:13:08.950Z',
        updated_at: '2019-10-10T19:13:08.950Z',
        color1: '#C0C0C0',
        color2: '#3895D3',
        color3: '#FFFFFF',
        color4: '#FFFFFF',
        color5: '#FFFFFF'
      }]
    }

    const result = actions.setSelectedPalettes(mockPalettes);

    expect(result).toEqual(expectedAction);
  });
});