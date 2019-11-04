// import React from 'react';
// import { Image } from 'react-native';
// import { TouchableOpacity } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import Icon from 'react-native-vector-icons/MaterialIcons';

import { theme } from 'src/constants';
import AuthMain from './Authentication/AuthMain';
import SignIn from './Authentication/SignIn';
import ForgotPassword from './Authentication/ForgotPassword';
import SignUp from './Authentication/SignUp';
import Settings from './App/Settings';
import Browse from './App/Browse';
import QRScan from './App/QRScan';
import SwitchDevice from './App/SwitchDevice';
import SearchDevice from './App/SearchDevice';
import MaintainDevice from './App/MaintainDevice';
import LiquidateDevice from './App/LiquidateDevice';
import AccountDevice from './App/AccountDevice';
import ActiveHistory from './App/ActiveHistory';
import MaintainHistory from './App/MaintainHistory';
import LiquidateInfo from './App/LiquidateInfo';

const configHeaderNavigatior = {
  defaultNavigationOptions: {
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: theme.sizes.header
    },
    headerStyle: {
      height: theme.sizes.base * 4,
      backgroundColor: theme.colors.white, // or 'white
      borderBottomColor: 'transparent',
      elevation: 0 // for android
    },
    headerLeftContainerStyle: {
      alignItems: 'center',
      marginLeft: theme.sizes.padding
    },
    headerRightContainerStyle: {
      alignItems: 'center',
      paddingRight: theme.sizes.padding * 3
    }
    // headerBackImage: <Image source={require('src/assets/icons/back.png')} />,
    // headerLeft: ({ onPress }) => (
    //   <TouchableOpacity onPress={onPress}>
    //     <Icon name="keyboard-backspace" size={30} color={theme.colors.white} />
    //   </TouchableOpacity>
    // )
  }
};
const AuthStack = createStackNavigator(
  { AuthMain, SignIn, SignUp, ForgotPassword },
  configHeaderNavigatior
);

const AppStack = createStackNavigator(
  {
    Browse,
    Settings,
    QRScan,
    SwitchDevice,
    SearchDevice,
    MaintainDevice,
    LiquidateDevice,
    AccountDevice,
    ActiveHistory,
    MaintainHistory,
    LiquidateInfo
  },
  {
    ...configHeaderNavigatior
    // initialRouteName: 'Settings'
  }
);

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
