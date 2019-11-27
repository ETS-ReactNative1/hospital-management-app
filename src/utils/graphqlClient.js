import { ApolloClient } from 'apollo-boost';
import { ApolloLink, Observable } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { InMemoryCache } from 'apollo-cache-inmemory';
import jwtDecode from 'jwt-decode';

import AppConst from '../AppConst';
import store from 'src/redux/store';
import meQuery from './meQuery';
import { meActions } from 'src/redux/actions';

const httpLink = createUploadLink({
  uri: `${AppConst.SERVER_URL}/graphql`,
  credentials: 'include'
});

const authLink = new ApolloLink(
  (operation, foward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(operation => {
          const { accessToken } = store.getState().me;

          if (accessToken) {
            operation.setContext({
              headers: {
                authorization: `Bearer ${accessToken}`
              }
            });
          }
        })
        .then(() => {
          handle = foward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        handle && handle.unsubscribe();
      };
    })
);

const refreshTokenLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const { accessToken } = store.getState().me;

    if (!accessToken) return true;

    try {
      const { exp } = jwtDecode(accessToken);
      return !(Date.now() >= exp * 1000);
    } catch {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch(`${AppConst.SERVER_URL}/refresh-token`, {
      method: 'POST',
      credentials: 'include'
    });
  },
  handleFetch: async accessToken => {
    console.log('client: ', accessToken);
    const me = await meQuery(accessToken);
    me.accessToken = accessToken;
    store.dispatch(meActions.updateMe(me));
  },
  handleError: err => {
    console.warn('Your refresh token is invalid. Try to relogin');
    console.error('refesh token err: ', err);
  }
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  }
};

const link = ApolloLink.from([refreshTokenLink, authLink, httpLink]);
const cache = new InMemoryCache();

export default new ApolloClient({ link, cache, defaultOptions });
