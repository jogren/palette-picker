import * as actions from './index';

describe('actions', () => {
  it('should have a type of SET_PALETTE', () => {
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
      type: 'SET_PALETTE',
      colors: [{
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

    const result = actions.setCurrentPalette(mockPalettes);

    expect(result).toEqual(expectedAction);
  });
});