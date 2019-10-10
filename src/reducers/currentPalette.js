export const currentPalette = (state = [], action) => {
  switch(action.type) {
    case 'SET_PALETTE':
      return action.colors;
    default:
      return state;
  }
}
