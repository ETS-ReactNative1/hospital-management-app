import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import SignIn from '../screens/Authentication/SignIn';
import ForgotPassword from '../screens/Authentication/ForgotPassword';
import SignUp from '../screens/Authentication/SignUp';
import Settings from '../screens/App/Settings';
import QRScan from '../screens/App/QRScan';

import { theme } from '../constants';

const AppStack = createBottomTabNavigator(
  {
    'Quét QR': { screen: QRScan },
    'Cài đặt': { screen: Settings }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        const IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Quét QR') {
          iconName = `ios-qr-scanner`;
        } else if (routeName === 'Cài đặt') {
          iconName = `ios-settings`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: '#42f44b',
      inactiveTintColor: 'gray'
    }
  }
);

const AuthStack = createStackNavigator(
  { SignIn, SignUp, ForgotPassword },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 4,
        backgroundColor: theme.colors.white, // or 'white
        borderBottomColor: 'transparent',
        elevation: 0 // for android
      },
      headerBackTitle: null,
      headerLeftContainerStyle: {
        alignItems: 'center',
        marginLeft: theme.sizes.base,
        paddingRight: theme.sizes.base
      },
      headerRightContainerStyle: {
        alignItems: 'center',
        paddingRight: theme.sizes.base
      }
    }
  }
);

const App = createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppStack
  },
  {
    initialRouteName: 'Auth'
  }
);

export default createAppContainer(App);
