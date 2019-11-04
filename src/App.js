import React, { useEffect, useState } from 'react';
import { StatusBar, View, Image, StyleSheet } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { Block } from './components';
import graphqlClient from './utils/graphqlClient';
import AppData from './AppData';
import AppConst from './AppConst';
import Navigation from './screens';
import { ME } from 'src/utils/graphqlQueries';

//TODO: Implement redux to manage global state through this tutorial: https://itnext.io/react-native-why-you-should-be-using-redux-persist-8ad1d68fa48b

String.prototype.toLocaleDateString = function() {
  return this.split('T')[0]
    .split('-')
    .reverse()
    .join('/');
};

Number.prototype.currencyFormat = function() {
  return `${this.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&.')} VND`;
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain'
  }
});

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!loading) return;

    fetch(`${AppConst.SERVER_URL}/refresh-token`, {
      method: 'POST',
      credentials: 'include'
    })
      .then(async data => {
        const { accessToken } = await data.json();
        AppData.accessToken = accessToken;
        if (accessToken) {
          fetch(`${AppConst.SERVER_URL}/graphql`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              query: `{
                me {
                  avatar
                  role
                }
              }`
            })
          })
            .then(async data => {
              const {
                data: { me }
              } = await data.json();
              Object.entries(me).forEach(([key, value]) => {
                AppData.userProfile[key] = value;
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  });

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image style={styles.image} source={require('src/assets/images/auth.jpg')} />
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
