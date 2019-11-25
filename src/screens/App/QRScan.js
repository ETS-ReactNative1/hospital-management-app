import React, { useState, useRef } from 'react';
import { RNCamera } from 'react-native-camera';
import { StyleSheet, Vibration, Image } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import { theme, localization } from 'src/constants';
import { BarcodeMask, Block, Typography } from 'src/components';
import AppData from 'src/AppData';

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

const TextPackage = localization[AppData.language];

const NotAuthorizedView = () => {
  return (
    <Block flex={false} middle center>
      <Image style={styles.image} source={require('src/assets/images/no_camera.png')} />

      <Block middle center padding={[0, theme.sizes.base * 2]}>
        <Typography bold title uppercase>
          {TextPackage.NO_CAMERA_PERMISSION}
        </Typography>
        <Typography center gray>
          {TextPackage.NO_CAMERA_PERMISSION_MESSAGE}
        </Typography>
      </Block>
    </Block>
  );
};

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
        style={styles.cameraStyle}
        onBarCodeRead={barcodeRecognized}
        flashMode={flashState}
        androidCameraPermissionOptions={{
          title: TextPackage.PERMISSION_DENIED,
          message: TextPackage.PERMISSION_DENIED_MESSAGE,
          buttonPositive: TextPackage.RETRY
        }}
        notAuthorizedView={<NotAuthorizedView />}
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
  cameraStyle: {
    flex: 1,
    width: '100%'
  },
  image: {
    width: '70%',
    resizeMode: 'contain'
  }
});

export default withNavigationFocus(QRScanScreen);
