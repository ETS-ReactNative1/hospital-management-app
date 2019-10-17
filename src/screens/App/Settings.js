// This is an example code for Bottom Navigation//
import React from 'react';
// import react in our code.
import { Button, View } from 'react-native';
import { useMutation } from 'react-apollo';
import AppData from '../../AppData';
import { SIGN_OUT } from '../../utils/graphqlMutations';
// import all the basic component we have used

const SettingsScreen = props => {
  const [signOut, { client }] = useMutation(SIGN_OUT);

  const handleSignOut = async () => {
    await signOut();
    AppData.setAccessToken('');

    props.navigation.navigate('Auth');
    await client.resetStore();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Sign out" onPress={handleSignOut} />
    </View>
  );
};

export default SettingsScreen;
