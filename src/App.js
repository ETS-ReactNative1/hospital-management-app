import React, { useEffect, useState } from 'react';
import { StatusBar, ActivityIndicator, View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { Block } from './components';
import graphqlClient from './utils/graphqlClient';
import AppData from './AppData';
import AppConst from './AppConst';
import Navigation from './screens';

//TODO: Implement redux to manage global state through this tutorial: https://itnext.io/react-native-why-you-should-be-using-redux-persist-8ad1d68fa48b

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
    <Block>
      <ApolloProvider client={graphqlClient}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Navigation />
      </ApolloProvider>
    </Block>
  );
};

export default App;
