import { combineReducers } from 'redux';
import { currentPalette } from './currentPalette';
import { currentProjects } from './currentProjects';


const rootReducer = combineReducers({
  currentPalette,
  currentProjects 
})

export default rootReducer;