import { currentPalette } from './currentPalette';

describe('currentPalette reducer', () => {
  it('should return the initial state', () => {
    const expected = [];

    const result = currentPalette(undefined, {});

    expect(result).toEqual(expected);
  });

  it('should return the new state with all of the current colors when SET_PALETTE action is passed through', () => {
    const expected = [
      {
      hexCode: '#cc9639',
      isLocked: false
      },
      {
        hexCode: '#077c96',
        isLocked: false
      }
    ]
    const actionObj = {
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

    const result = currentPalette(undefined, actionObj);

    expect(result).toEqual(expected);
  });
});