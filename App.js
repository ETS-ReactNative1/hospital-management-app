import React, { useRef } from 'react';
import { RNCamera } from 'react-native-camera';
import { StyleSheet, Vibration } from 'react-native';

import BarcodeMask from './src/components/BarcodeMask/BarcodeMask';

const App = () => {
  const cameraRef = useRef(null);
  const barcodeRecognized = barcode => {
    console.warn(barcode.data);
    Vibration.vibrate();
  };

  return (
    <RNCamera
      captureAudio={false}
      ref={cameraRef}
      style={styles.CameraStyle}
      onBarCodeRead={barcodeRecognized}
    >
      <BarcodeMask showAnimatedLine={false} />
    </RNCamera>
  );
};

const styles = StyleSheet.create({
  CameraStyle: {
    flex: 1,
    width: '100%'
  }
});

export default App;
