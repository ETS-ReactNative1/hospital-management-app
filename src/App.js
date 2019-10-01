import React, { useEffect, useState } from 'react';
import { Platform, StatusBar, ActivityIndicator, View, StyleSheet } from 'react-native';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink, Observable } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { InMemoryCache } from 'apollo-cache-inmemory';
import jwtDecode from 'jwt-decode';

import Navigation from './navigation';
import { Block } from './components';
import { URL } from './constants/config';
import { getAccessToken, setAccessToken } from './utils/accessToken';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const httpLink = createHttpLink({
  uri: `${URL}/graphql`,
  credentials: 'include'
});

const authLink = new ApolloLink(
  (operation, foward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(operation => {
          const accessToken = getAccessToken();

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
    const token = getAccessToken();

    if (!token) {
      return true;
    }

    try {
      const { exp } = jwtDecode(token);
      return !(Date.now() >= exp * 1000);
    } catch {
      return false;
    }
  },
  fetchAccessToken: () => {
    return (
      fetch(`${URL}/refresh-token`),
      {
        method: 'POST',
        credentials: 'include'
      }
    );
  },
  handleFetch: accessToken => {
    setAccessToken(accessToken);
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

const client = new ApolloClient({
  link,
  cache
});

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${URL}/refresh-token`, {
      method: 'POST',
      credentials: 'include'
    })
      .then(async data => {
        const { accessToken } = await data.json();
        setAccessToken(accessToken);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  return (
    <Block white>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <ApolloProvider client={client}>
        <Navigation />
      </ApolloProvider>
    </Block>
  );
};

export default App;
