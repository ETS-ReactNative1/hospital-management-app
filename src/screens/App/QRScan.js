import React, { useState, useRef } from 'react';
import { RNCamera } from 'react-native-camera';
import { Alert, StyleSheet, Vibration, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { Query, Mutation } from 'react-apollo';

import { BarcodeMask } from '../../components';
import { CREATE_EVENT, DEVICE_STATE } from '../../utils/graphqlQuery';

// TODO: REMEMBER to rewrite <Query> and <Mutation> as react hooks (useQuery, useMutation)

const QRScanScreen = props => {
  const { isFocused } = props.navigation;
  const cameraRef = useRef(null);
  const [flashState, setFlashState] = useState(RNCamera.Constants.FlashMode.off);
  const [scanning, setScanning] = useState(false);
  const [deviceId, setDeviceId] = useState(null);

  const barcodeRecognized = async (barcode, refetch) => {
    if (!scanning) {
      Vibration.vibrate();
      setScanning(true);
      setFlashState(RNCamera.Constants.FlashMode.off);
      await setDeviceId(barcode.data);
      refetch();
    }
  };

  const switchFlashState = state => {
    setFlashState(state ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off);
  };

  const onDeviceStateCompleted = (res, createEvent) => {
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
          onPress: () => {
            createEvent();
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
            setDeviceId(null);
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <Mutation
      mutation={CREATE_EVENT}
      variables={{ deviceId }}
      onCompleted={res => onCreateEventSuccess(res)}
    >
      {createEvent => {
        return (
          <Query
            query={DEVICE_STATE}
            variables={{ id: deviceId }}
            onCompleted={res => onDeviceStateCompleted(res, createEvent)}
          >
            {({ refetch }) => {
              return (
                <View style={{ flex: 1 }}>
                  {isFocused() ? (
                    <RNCamera
                      captureAudio={false}
                      ref={cameraRef}
                      style={styles.CameraStyle}
                      onBarCodeRead={async barcode => {
                        await barcodeRecognized(barcode, refetch);
                      }}
                      flashMode={flashState}
                    >
                      <BarcodeMask
                        showAnimatedLine={false}
                        flashState={flashState}
                        switchFlashState={switchFlashState}
                      />
                    </RNCamera>
                  ) : null}
                </View>
              );
            }}
          </Query>
        );
      }}
    </Mutation>
  );
};

const styles = StyleSheet.create({
  CameraStyle: {
    flex: 1,
    width: '100%'
  }
});

export default withNavigationFocus(QRScanScreen);
