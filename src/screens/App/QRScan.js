import React, { useState, useRef } from 'react';
import { RNCamera } from 'react-native-camera';
import { Alert, StyleSheet, Vibration, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { useLazyQuery, useMutation } from 'react-apollo';

import { BarcodeMask } from '../../components';
import { DEVICE_STATE } from '../../utils/graphqlQueries';
import { CREATE_EVENT } from '../../utils/graphqlMutations';

// TODO-1 : REMEMBER to rewrite <Query> and <Mutation> as react hooks (useQuery, useMutation)
// *: DONE TODO-1

const QRScanScreen = props => {
  const { isFocused } = props.navigation;
  const cameraRef = useRef(null);
  const [flashState, setFlashState] = useState(RNCamera.Constants.FlashMode.off);
  const [scanning, setScanning] = useState(false);
  const [createEvent] = useMutation(CREATE_EVENT);
  const [queryDevice, device] = useLazyQuery(DEVICE_STATE);

  const onDeviceStateCompleted = res => {
    Alert.alert(
      'Please Confirm!',
      `The device is currently ${res.device.currentState ? 'ON' : 'OFF'}, Do you want to turn it ${
        res.device.currentState ? 'off' : 'on'
      }?`,
      [
        {
          text: 'Report',
          onPress: () => {
            // TODO: Write function for report here!
            console.warn('Report feature is in future development!');
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Sure',
          onPress: async () => {
            delete device.data;
            const event = await createEvent({
              variables: { deviceId: res.device.id }
            });

            // execute when have event data
            if (event.data) {
              onCreateEventSuccess(event.data);
            }
          }
        }
      ]
    );
  };

  const onCreateEventSuccess = res => {
    Alert.alert(
      'Success!',
      `You have ${res.createEvent.action ? 'turned on' : 'turned off'} the device`,
      [
        {
          text: 'Continue',
          onPress: () => {
            setScanning(false);
          }
        }
      ],
      { cancelable: false }
    );
  };

  const barcodeRecognized = barcode => {
    if (!scanning) {
      Vibration.vibrate();
      setScanning(true);
      setFlashState(RNCamera.Constants.FlashMode.off);
      queryDevice({ variables: { id: barcode.data } });
    }
  };

  const switchFlashState = state => {
    setFlashState(state ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off);
  };

  // execute when have device data
  if (device.data) {
    onDeviceStateCompleted(device.data);
  }

  return (
    <View style={{ flex: 1 }}>
      {isFocused() ? (
        <RNCamera
          captureAudio={false}
          ref={cameraRef}
          style={styles.CameraStyle}
          onBarCodeRead={barcodeRecognized}
          flashMode={flashState}
        >
          {isFocused() ? (
            <BarcodeMask
              showAnimatedLine={!scanning}
              flashState={flashState}
              switchFlashState={switchFlashState}
            />
          ) : null}
        </RNCamera>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  CameraStyle: {
    flex: 1,
    width: '100%'
  }
});

export default withNavigationFocus(QRScanScreen);
