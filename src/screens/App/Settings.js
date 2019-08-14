// This is an example code for Bottom Navigation//
import React from 'react';
// import react in our code.
import { Button, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import all the basic component we have used

export default class SettingsScreen extends React.Component {
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Sign out" onPress={this._signOutAsync} />
      </View>
    );
  }
}
