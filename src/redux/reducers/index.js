import { combineReducers } from 'redux';

import popupReducer from './popupReducer';
import meReducer from './meReducer';

export default combineReducers({
  popup: popupReducer,
  me: meReducer
});
