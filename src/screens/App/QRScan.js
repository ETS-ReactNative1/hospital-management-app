import React, { useState, useRef } from 'react';
import { RNCamera } from 'react-native-camera';
import { StyleSheet, Vibration, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import { BarcodeMask } from '../../components';

const QRScanScreen = props => {
  const { isFocused } = props.navigation;
  const cameraRef = useRef(null);
  const [flashState, _setFlashState] = useState(RNCamera.Constants.FlashMode.off);
  const [scanning, _setScanning] = useState(false);

  const barcodeRecognized = barcode => {
    if (!scanning) {
      Vibration.vibrate();
      _setFlashState(RNCamera.Constants.FlashMode.off);
      _setScanning(true);
      console.warn(barcode.data);
      setTimeout(() => _setScanning(false), 2000);
    }
  };

  const switchFlashState = state => {
    _setFlashState(state ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off);
  };

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
          <BarcodeMask
            showAnimatedLine={false}
            flashState={flashState}
            switchFlashState={switchFlashState}
          />
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
