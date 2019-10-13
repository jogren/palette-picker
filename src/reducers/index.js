import { combineReducers } from 'redux';
import { currentPalette } from './currentPalette';
import { currentProjects } from './currentProjects';
import { selectedPalettes } from './selectedPalettes';
import { currentPaletteId } from './currentPaletteId';


const rootReducer = combineReducers({
  currentPalette,
  currentProjects,
  selectedPalettes,
  currentPaletteId
})

export default rootReducer;