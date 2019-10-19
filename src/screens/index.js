import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import AuthMain from './Authentication/AuthMain'
import SignIn from './Authentication/SignIn';
import ForgotPassword from './Authentication/ForgotPassword';
import SignUp from './Authentication/SignUp';
import Settings from './App/Settings';
import Browse from './App/Browse';
import QRScan from './App/QRScan';

import { theme } from 'src/constants';

const AuthStack = createStackNavigator(
  { AuthMain, SignIn, SignUp, ForgotPassword },
  {
    defaultNavigationOptions: {
      headerTitleStyle: {
        fontWeight: 'bold',
        marginLeft: 0,
        paddingLeft: 0,
        paddingRight: theme.sizes.padding,
        fontSize: theme.sizes.h1
      },
      headerStyle: {
        height: theme.sizes.base * 4,
        backgroundColor: theme.colors.primary, // or 'white
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
        paddingRight: theme.sizes.padding
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
