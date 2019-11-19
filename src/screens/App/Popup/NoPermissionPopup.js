import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { Dialog, Typography } from 'src/components';
import { localization } from 'src/constants';

import AppData from 'src/AppData';

const TextPackage = localization[AppData.language];

const NoPermissionPopup = () => {
  return (
    <Dialog title={TextPackage.NO_PERMISSION} confirmText={TextPackage.UNDERSTOOD}>
      <View>
        <Image style={styles.image} source={require('src/assets/images/no_permission.png')} />
        <Typography gray center>
          {TextPackage.NO_PERMISSION_MESSAGE}
        </Typography>
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover'
  }
});

export default NoPermissionPopup;
