import store from 'src/redux/store';
import { popupActions } from 'src/redux/actions';
import AppConst from '../AppConst';

const graphqlErrorHandler = ({ graphQLErrors, networkError }, handleConfirm) => {
  graphQLErrors &&
    graphQLErrors.forEach(error => {
      // console.log('Graphql Error: ', error);
      if (
        error.message === 'Device was liquidated' ||
        error.message === 'Device is under maintain'
      ) {
        store.dispatch(
          popupActions.showPopup(AppConst.NO_ACTIVE_POPUP, {
            availability: error.message === 'Device was liquidated' ? 'liquidated' : 'maintaining'
          })
        );
      } else {
        store.dispatch(
          popupActions.showPopup(AppConst.ERROR_POPUP, {
            errorMsg: error.message,
            path: error.path[0],
            handleConfirm
          })
        );
      }
    });

  networkError &&
    store.dispatch(
      popupActions.showPopup(AppConst.ERROR_POPUP, {
        errorMsg: networkError.message,
        handleConfirm
      })
    );
};

export default graphqlErrorHandler;
