import { currentPaletteId } from './currentPaletteId';

describe('currentPaletteId reducer', () => {
  it('should return the initial state', () => {
    const expected = null;

    const result = currentPaletteId(undefined, {});

    expect(result).toEqual(expected);
  });

  it('should return the new state with all of the current palette info when SET_PALETTE_ID action is passed through', () => {
    const expected = {
      id: 1,
      name: 'palette 1',
      projectId: 3
    }
    const actionObj = {
      type: 'SET_PALETTE_ID',
      id: 1,
      name: 'palette 1',
      project_id: 3
    }

    const result = currentPaletteId(undefined, actionObj);

    expect(result).toEqual(expected);
  });

  it('should return null when the action CLEAR_SELECTED is passed through', () => {
    const expected = null;
    const actionObj = {
      type: 'CLEAR_SELECTED',
      id: 1,
      name: 'palette 1',
      project_id: 3
    }

    const result = currentPaletteId(undefined, actionObj);

    expect(result).toEqual(expected);
  });
});