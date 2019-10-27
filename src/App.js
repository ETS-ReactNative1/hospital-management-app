import React, { useEffect, useState } from 'react';
import { Platform, StatusBar, ActivityIndicator, View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { Block } from './components';
import graphqlClient from './utils/graphqlClient';
import AppData from './AppData';
import AppConst from './AppConst';
import Navigation from './screens';

//TODO: Implement redux to manage global state through this tutorial: https://itnext.io/react-native-why-you-should-be-using-redux-persist-8ad1d68fa48b

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

  if (loading || Platform.OS === 'ios') {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  return (
    <Block>
      <ApolloProvider client={graphqlClient}>
        <Navigation />
      </ApolloProvider>
    </Block>
  );
};

export default App;
