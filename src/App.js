global.SERVER_URL = 'http://172.16.11.127:8000'

import React, { useEffect, useState } from 'react';
import { Platform, StatusBar, ActivityIndicator, View, StyleSheet } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { Block } from './components';
import { graphqlClient } from './utils';
import AppData from './AppData';
import Navigation from './screens';

//TODO: Implement redux to manage global state through this tutorial: https://itnext.io/react-native-why-you-should-be-using-redux-persist-8ad1d68fa48b
import validate from 'validate.js';
import validators from './utils/validators';
validate.validators = {
  ...validate.validators,
  ...validators
};
validate.validators.email.PATTERN = /^([\w-\.]+@[\w-]+\.+[\w-]{2,5})?$/;
validate.validators.email.message = '^Email không hợp lệ';
//------------------

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
      fetch(`${global.SERVER_URL}/refresh-token`, {
      method: 'POST',
      credentials: 'include'
    }).then(async data => {
      const { accessToken } = await data.json();
      AppData.setAccessToken(accessToken);
      setLoading(false);
    }).catch(err => { console.log(err) });
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
