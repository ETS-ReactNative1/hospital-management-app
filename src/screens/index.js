import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { theme } from 'src/constants/';
import AuthMain from './Authentication/AuthMain';
import SignIn from './Authentication/SignIn';
import ForgotPassword from './Authentication/ForgotPassword';
import SignUp from './Authentication/SignUp';
import Settings from './App/Settings';
import Browse from './App/Browse';
import QRScan from './App/QRScan';

const configHeaderNavigatior = {
  defaultNavigationOptions: {
    headerTitleStyle: {
      fontWeight: 'bold',
      marginLeft: 0,
      paddingLeft: 0,
      paddingRight: theme.sizes.padding,
      fontSize: theme.sizes.h1,
      color: theme.colors.black
    },
    headerStyle: {
      height: theme.sizes.base * 3.5,
      backgroundColor: theme.colors.white, // or 'white
      borderBottomColor: 'transparent',
      elevation: 0 // for android
    },
    headerLeftContainerStyle: {
      alignItems: 'center',
      marginLeft: theme.sizes.padding,
      paddingRight: theme.sizes.padding
    },
    headerRightContainerStyle: {
      alignItems: 'center',
      paddingRight: theme.sizes.padding * 2
    },
    headerLeft: ({ onPress }) => (
      <TouchableOpacity onPress={onPress}>
        <Icon name="keyboard-backspace" size={30} color={theme.colors.black} />
      </TouchableOpacity>
    )
  }
};
const AuthStack = createStackNavigator(
  { AuthMain, SignIn, SignUp, ForgotPassword },
  configHeaderNavigatior
);

const AppStack = createStackNavigator({ Browse, QRScan, Settings }, configHeaderNavigatior);

const Navigation = createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppStack
  },
  {
    initialRouteName: 'Auth'
  }
);

export default createAppContainer(Navigation);
