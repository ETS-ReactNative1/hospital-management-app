import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';
import SettingsScreen from './pages/SettingsScreen';

import QRScanScreen from './pages/QRScanScreen';

const QRScanStack = createStackNavigator(
  {
    QRScanScreen: { screen: QRScanScreen }
  },
  {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#42f44b'
      },
      headerTintColor: '#FFFFFF',
      title: 'Quét QR'
    }
  }
);
const SettingsStack = createStackNavigator(
  {
    Settings: { screen: SettingsScreen }
  },
  {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#42f44b'
      },
      headerTintColor: '#FFFFFF',
      title: 'Cài đặt'
    }
  }
);
const App = createBottomTabNavigator(
  {
    'Quét QR': { screen: QRScanStack },
    'Cài đặt': { screen: SettingsStack }
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

export default createAppContainer(App);
