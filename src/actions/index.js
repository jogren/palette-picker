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

export const setCurrentPaletteId = (id, name) => ({
  type: 'SET_PALETTE_ID',
  id,
  name
});