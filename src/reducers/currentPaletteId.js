export const currentPaletteId = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PALETTE_ID':
      return { id: action.id, name: action.name }
    default:
      return state;
  }
}