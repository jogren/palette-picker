import { combineReducers } from 'redux';
import { currentPalette } from './currentPalette';
import { currentProjects } from './currentProjects';
import { selectedPalettes } from './selectedPalettes';
import { currentPaletteId } from './currentPaletteId';
import { errorMsg } from './errorMsg'


const rootReducer = combineReducers({
  currentPalette,
  currentProjects,
  selectedPalettes,
  currentPaletteId,
  errorMsg
})

export default rootReducer;