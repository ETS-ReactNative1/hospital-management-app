import { ApolloClient } from 'apollo-boost';
import { ApolloLink, Observable } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { InMemoryCache } from 'apollo-cache-inmemory';
import jwtDecode from 'jwt-decode';

import AppData from '../AppData';
import AppConst from '../AppConst';

const httpLink = createHttpLink({
  uri: `${AppConst.SERVER_URL}/graphql`,
  credentials: 'include'
});

const authLink = new ApolloLink(
  (operation, foward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(operation => {
          const accessToken = AppData.accessToken;

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
    const token = AppData.accessToken;

    if (!token) return true;

    try {
      const { exp } = jwtDecode(token);
      return !(Date.now() >= exp * 1000);
    } catch {
      return false;
    }
  },
  fetchAccessToken: () => {
    return (
      fetch(`${AppConst.SERVER_URL}/refresh-token`),
      {
        method: 'POST',
        credentials: 'include'
      }
    );
  },
  handleFetch: accessToken => {
    AppData.accessToken = accessToken;
  },
  handleError: err => {
    console.warn('Your refresh token is invalid. Try to relogin');
    console.error('refesh token err: ', err);
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  graphQLErrors &&
    graphQLErrors.forEach(({ message }) => {
      console.log('GraphQL error', message);
    });

  networkError && console.log('Network error', networkError);
});

const link = ApolloLink.from([refreshTokenLink, authLink, errorLink, httpLink]);
const cache = new InMemoryCache();

export default new ApolloClient({ link, cache });
