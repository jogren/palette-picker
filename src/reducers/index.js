import { combineReducers } from 'redux';
import { currentPalette } from './currentPalette';
import { currentProjects } from './currentProjects';
import { selectedPalettes } from './selectedPalettes';

const rootReducer = combineReducers({
  currentPalette,
  currentProjects,
  selectedPalettes
})

export default rootReducer;