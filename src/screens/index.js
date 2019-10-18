import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SignIn from './Authentication/SignIn';
import ForgotPassword from './Authentication/ForgotPassword';
import SignUp from './Authentication/SignUp';
import Settings from './App/Settings';
import Browse from './App/Browse';
import QRScan from './App/QRScan';

import { theme } from '../constants';

const AuthStack = createStackNavigator(
  { SignIn, SignUp, ForgotPassword },
  {
    defaultNavigationOptions: {
      headerTitleStyle: {
        fontWeight: 'bold',
        paddingLeft: theme.sizes.base,
        paddingRight: theme.sizes.base,
        fontSize: theme.sizes.h1
      },
      headerStyle: {
        height: theme.sizes.base * 4,
        backgroundColor: theme.colors.white, // or 'white
        borderBottomColor: 'transparent',
        elevation: 0 // for android
      },
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

const AppStack = createStackNavigator(
  { Browse, QRScan, Settings },
  {
    defaultNavigationOptions: {
      header: null
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
