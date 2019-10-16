import { errorMsg } from './errorMsg';

describe('errorMsg reducer', () => {
  it('should return the initial state', () => {
    const expected = "";

    const result = errorMsg(undefined, {});

    expect(result).toEqual(expected);
  });

  it('should return the new state with an error message when HAS_ERRORED action is passed through', () => {
    const expected = 'There was an error'
    const actionObj = {
      type: 'HAS_ERRORED',
      errorMsg: 'There was an error'
    }

    const result = errorMsg(undefined, actionObj);

    expect(result).toEqual(expected);
  });
});