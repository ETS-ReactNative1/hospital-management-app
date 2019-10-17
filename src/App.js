import React, { useEffect, useState } from 'react';
import { Platform, StatusBar, ActivityIndicator, View, StyleSheet } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import validate from 'validate.js';

import graphqlClient from './utils/graphqlClient';
import AppData from './AppData';
import validators from './utils/validators';

import Navigation from './navigation';
import { Block } from './components';

//TODO: Implement redux to manage global state through this tutorial: https://itnext.io/react-native-why-you-should-be-using-redux-persist-8ad1d68fa48b
validate.validators = {
  ...validate.validators,
  ...validators
};
validate.validators.email.PATTERN = /^([\w-\.]+@[\w-]+\.+[\w-]{2,5})?$/;
validate.validators.email.message = '^Email không hợp lệ';

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${global.serverURL}/refresh-token`, {
      method: 'POST',
      credentials: 'include'
    }).then(async data => {
      const { accessToken } = await data.json();
      AppData.setAccessToken(accessToken);
      setLoading(false);
    }).catch(err => { console.log(err) });
  });

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  return (
    <Block>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <ApolloProvider client={graphqlClient}>
        <Navigation />
      </ApolloProvider>
    </Block>
  );
};

export default App;
