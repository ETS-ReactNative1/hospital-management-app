import React, { useState, useRef } from 'react';
import { RNCamera } from 'react-native-camera';
import { StyleSheet, Vibration, View, ActivityIndicator } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import { theme } from 'src/constants';
import { BarcodeMask } from 'src/components';

// TODO-1 : REMEMBER to rewrite <Query> and <Mutation> as react hooks (useQuery, useMutation)
// *: DONE TODO-1

const FEATURE_ORDER = [
  'NotFound',
  'SwitchDevice',
  'SearchDevice',
  'MaintainDevice',
  'LiquidateDevice',
  'AccountDevice'
];

const QRScanScreen = props => {
  const {
    navigation,
    navigation: { isFocused }
  } = props;
  const cameraRef = useRef(null);
  const [flashState, setFlashState] = useState(RNCamera.Constants.FlashMode.off);

  // const onDeviceStateCompleted = res => {
  //   Alert.alert(
  //     'Please Confirm!',
  //     `The device is currently ${res.device.currentState ? 'ON' : 'OFF'}, Do you want to turn it ${
  //       res.device.currentState ? 'off' : 'on'
  //     }?`,
  //     [
  //       {
  //         text: 'Report',
  //         onPress: () => {
  //           // TODO: Write function for report here!
  //           console.warn('Report feature is in future development!');
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         style: 'cancel'
  //       },
  //       {
  //         text: 'Sure',
  //         onPress: async () => {
  //           delete device.data;
  //           const event = await createEvent({
  //             variables: { deviceId: res.device.id }
  //           });

  //           // execute when have event data
  //           if (event.data) {
  //             onCreateEventSuccess(event.data);
  //           }
  //         }
  //       }
  //     ]
  //   );
  // };

  // const onCreateEventSuccess = res => {
  //   Alert.alert(
  //     'Success!',
  //     `You have ${res.createEvent.action ? 'turned on' : 'turned off'} the device`,
  //     [
  //       {
  //         text: 'Continue',
  //         onPress: () => {
  //           setScanning(false);
  //         }
  //       }
  //     ],
  //     { cancelable: false }
  //   );
  // };

  const barcodeRecognized = barcode => {
    Vibration.vibrate();
    setFlashState(RNCamera.Constants.FlashMode.off);
    navigation.navigate(FEATURE_ORDER[navigation.state.params.id], { deviceId: barcode.data });
  };

  const switchFlashState = state => {
    setFlashState(state ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {isFocused() ? (
        <RNCamera
          captureAudio={false}
          ref={cameraRef}
          style={styles.CameraStyle}
          onBarCodeRead={barcodeRecognized}
          flashMode={flashState}
        >
          <BarcodeMask flashState={flashState} switchFlashState={switchFlashState} />
        </RNCamera>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

QRScanScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('name', 'QRScan'),
  headerTitleStyle: {
    marginLeft: 0,
    fontSize: theme.sizes.header,
    fontWeight: 'bold'
  }
});

const styles = StyleSheet.create({
  CameraStyle: {
    flex: 1,
    width: '100%'
  }
});

export default withNavigationFocus(QRScanScreen);
