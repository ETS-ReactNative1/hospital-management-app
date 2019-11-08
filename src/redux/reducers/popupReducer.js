import AppConst from 'src/AppConst';

const initialState = {
  popupType: AppConst.NO_POPUP,
  popupProps: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_POPUP':
      return {
        popupType: action.popupType,
        popupProps: action.popupProps
      };
    case 'HIDE_POPUP':
      return initialState;
    default:
      return state;
  }
};
