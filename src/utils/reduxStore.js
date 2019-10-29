import { createStore, combineReducers } from 'redux';
import AppConst from 'src/AppConst';

export const actions = {
  showPopup: popupConfig => ({ type: 'SHOW_POPUP', payload: popupConfig }),
  hidePopup: () => ({ type: 'HIDE_POPUP' })
};

const popupReducer = (state = { type: AppConst.NO_POPUP }, action) => {
  switch (action.type) {
    case 'SHOW_POPUP':
      return action.payload;
    case 'HIDE_POPUP':
      return { type: AppConst.NO_POPUP };
    default:
      return state;
  }
};

const reducers = combineReducers({
  popup: popupReducer
});

export const store = createStore(reducers);
