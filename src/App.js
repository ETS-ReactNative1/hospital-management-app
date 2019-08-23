import React from 'react';
import { Platform, StatusBar } from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Navigation from './navigation';
import { Block } from './components';

const client = new ApolloClient({
  uri: 'http://10.0.2.2:8000/graphql'
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
