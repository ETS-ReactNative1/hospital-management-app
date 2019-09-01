import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import AsyncStorage from '@react-native-community/async-storage';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import Navigation from './navigation';
import { Block } from './components';

const httpLink = createHttpLink({
  uri: 'https://hospital-management-2019.appspot.com/graphql'
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('userToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default class App extends React.Component {
  render() {
    return (
      <Block white>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <ApolloProvider client={client}>
          <Navigation />
        </ApolloProvider>
      </Block>
    );
  }
}
