import store from 'src/redux/store';
import { popupActions } from 'src/redux/actions';
import AppConst from '../AppConst';

const graphqlErrorHandler = ({ graphQLErrors, networkError }) => {
  graphQLErrors &&
    graphQLErrors.forEach(error => {
      console.log('Graphql Error: ', error.message);
      store.dispatch(popupActions.showPopup(AppConst.ERROR_POPUP, { errorMsg: error.message }));
    });

  networkError &&
    store.dispatch(
      popupActions.showPopup(AppConst.ERROR_POPUP, { errorMsg: networkError.message })
    );
};

export default graphqlErrorHandler;
