import { combineReducers } from 'redux';
import { currentPalette } from './currentPalette';
import { currentProjects } from './currentProjects';
import { selectedPalettes } from './selectedPalettes';
import { currentPaletteId } from './currentPaletteId';
import { errorMsg } from './errorMsg'
import { currentProjectId } from './currentProjectId'


const rootReducer = combineReducers({
  currentPalette,
  currentProjects,
  selectedPalettes,
  currentPaletteId,
  currentProjectId,
  errorMsg
});

export default rootReducer;