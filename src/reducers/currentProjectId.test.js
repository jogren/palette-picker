import { currentProjectId } from './currentProjectId';

describe('currentProjectId reducer', () => {
  it('should return the initial state', () => {
    const expected = "";

    const result = currentProjectId(undefined, {});

    expect(result).toEqual(expected);
  });

  it('should return the new state with the project id when SET_PROJECT_ID action type is passed through', () => {
    const expected = 2;
    const actionObj = {
      type: 'SET_PROJECT_ID',
      id: 2
    }

    const result = currentProjectId(undefined, actionObj);

    expect(result).toEqual(expected);
  });
});