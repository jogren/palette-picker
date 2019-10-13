export const currentPaletteId = (state = null, action) => {
  switch (action.type) {
    case 'SET_PALETTE_ID':
      return { id: action.id, name: action.name, projectId: action.project_id }
    case 'CLEAR_SELECTED':
      return null
    default:
      return state;
  }
}