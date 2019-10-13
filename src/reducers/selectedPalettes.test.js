import { selectedPalettes } from './selectedPalettes';

describe('selectedPalettes reducer', () => {
  it('should return the initial state', () => {
    const expected = [];

    const result = selectedPalettes(undefined, {});

    expect(result).toEqual(expected);
  });

  it('should return the new state with all of the current colors when SELECTED_PALETTES action is passed through', () => {
    const expected = [
      {
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
      }
    ]
    const actionObj = {
      type: 'SELECTED_PALETTES',
      palettes: [
        {
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
        }
      ]
    }

    const result = selectedPalettes(undefined, actionObj);

    expect(result).toEqual(expected);
  });
});