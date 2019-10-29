import React, { useEffect, useState } from 'react';
import { StatusBar, ActivityIndicator, View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { store } from './utils/reduxStore';
import graphqlClient from './utils/graphqlClient';
import AppData from './AppData';
import AppConst from './AppConst';
import Navigation from './screens';
import Popup from './screens/App/Popup';

String.prototype.toLocaleDateString = function() {
  return this.split('T')[0]
    .split('-')
    .reverse()
    .join('/');
};

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${AppConst.SERVER_URL}/refresh-token`, {
      method: 'POST',
      credentials: 'include'
    })
      .then(async data => {
        const { accessToken } = await data.json();
        AppData.accessToken = accessToken;
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  });

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ApolloProvider client={graphqlClient}>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Navigation />
        <Popup />
      </Provider>
    </ApolloProvider>
  );
};

export default App;
