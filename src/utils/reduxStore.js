import { createStore, combineReducers } from 'redux';
import AppConst from 'src/AppConst';

export const actions = {
  showPopup: popupConfig => ({ type: 'SHOW_POPUP', payload: popupConfig }),
  hidePopup: feedback => ({ type: 'HIDE_POPUP', payload: feedback })
};

const popupReducer = (state = { type: AppConst.NO_POPUP }, action) => {
  switch (action.type) {
    case 'SHOW_POPUP':
      return action.payload;
    case 'HIDE_POPUP':
      return { type: AppConst.NO_POPUP, feedback: action.payload };
    default:
      return state;
  }
};

const reducers = combineReducers({
  popup: popupReducer
});

export const store = createStore(reducers);
