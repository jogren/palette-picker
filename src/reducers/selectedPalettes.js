export const selectedPalettes = (state = [], action) => {
  switch(action.type) {
    case 'SELECTED_PALETTES':
      return action.palettes;
    default:
      return state
  }
}