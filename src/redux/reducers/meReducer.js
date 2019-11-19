const initialState = {
  email: null,
  role: null,
  firstName: null,
  lastName: null,
  phone: null,
  avatar: require('src/assets/images/avatar.png'),
  accessToken: '',
  language: 'VN'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_ME':
      const newState = { ...state, ...action.payload };
      if (action.payload.avatar) {
        newState.avatar = { uri: action.payload.avatar };
      } else {
        newState.avatar = state.avatar;
      }
      // console.log(newState);
      return newState;
    case 'SIGN_OUT': {
      return initialState;
    }
    default:
      return state;
  }
};
