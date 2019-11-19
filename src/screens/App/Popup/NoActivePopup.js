import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { Dialog, Typography } from 'src/components';
import { localization } from 'src/constants';

import AppData from 'src/AppData';

const TextPackage = localization[AppData.language];

const NoInternetPopup = ({ availability, ...otherProps }) => {
  return (
    <Dialog
      title={
        availability === 'maintaining'
          ? TextPackage.DEVICE_MAINTAINING
          : TextPackage.DEVICE_LIQUIDATED
      }
      confirmText={TextPackage.UNDERSTOOD}
      hideCancel
      {...otherProps}
    >
      <View>
        <Image
          style={styles.image}
          source={
            availability === 'maintaining'
              ? require('src/assets/images/maintaining.jpg')
              : require('src/assets/images/liquidated.jpg')
          }
        />
        <Typography center gray>
          {availability === 'maintaining'
            ? TextPackage.DEVICE_MAINTAINING_DESC
            : TextPackage.DEVICE_LIQUIDATED_DESC}
        </Typography>
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover'
  }
});

export default NoInternetPopup;
