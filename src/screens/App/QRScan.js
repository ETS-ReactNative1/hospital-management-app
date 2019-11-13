import React, { useState, useRef } from 'react';
import { RNCamera } from 'react-native-camera';
import { StyleSheet, Vibration } from 'react-native';
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
  const { navigation, isFocused } = props;
  const cameraRef = useRef(null);
  const [flashState, setFlashState] = useState(RNCamera.Constants.FlashMode.off);

  const barcodeRecognized = barcode => {
    Vibration.vibrate();
    setFlashState(RNCamera.Constants.FlashMode.off);
    navigation.navigate(FEATURE_ORDER[navigation.state.params.id], { deviceId: barcode.data });
  };

  const switchFlashState = state => {
    setFlashState(state ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off);
  };

  if (isFocused) {
    return (
      <RNCamera
        captureAudio={false}
        ref={cameraRef}
        style={styles.CameraStyle}
        onBarCodeRead={barcodeRecognized}
        flashMode={flashState}
      >
        <BarcodeMask flashState={flashState} switchFlashState={switchFlashState} />
      </RNCamera>
    );
  }

  return null;
};

QRScanScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('name', 'QRScan')
});

const styles = StyleSheet.create({
  CameraStyle: {
    flex: 1,
    width: '100%'
  }
});

export default withNavigationFocus(QRScanScreen);
