/**
 * @format
 */
import React from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';

import App from './src/App';
import { name as appName } from './app.json';
import graphqlClient from './src/utils/graphqlClient';
import { store } from './src/redux/store';

const ApolloApp = () => {
  return (
    <ApolloProvider client={graphqlClient}>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <App />
      </Provider>
    </ApolloProvider>
  );
};

AppRegistry.registerComponent(appName, () => ApolloApp);
