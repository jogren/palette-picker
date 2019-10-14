export const setCurrentPalette = (colors) => ({
  type: 'SET_PALETTE',
  colors
});

export const setCurrentProjects = (projects) => ({
  type: 'SET_PROJECTS',
  projects
});

export const setSelectedPalettes = (palettes) => ({
  type: 'SELECTED_PALETTES',
  palettes
});

export const setCurrentPaletteId = (id, name, project_id) => ({
  type: 'SET_PALETTE_ID',
  id,
  name,
  project_id
});

export const clearSelectedPaletteId = () => ({
  type: 'CLEAR_SELECTED'
});

export const hasErrored = errorMsg => ({
  type: 'HAS_ERRORED',
  errorMsg
});