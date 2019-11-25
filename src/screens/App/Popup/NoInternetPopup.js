import React from 'react';
import { View, StyleSheet, Image, BackHandler } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { connect } from 'react-redux';

import { Dialog, Typography } from 'src/components';
import { localization } from 'src/constants';

import AppConst from 'src/AppConst';
import AppData from 'src/AppData';
import { popupActions } from 'src/redux/actions';

const TextPackage = localization[AppData.language];

const NoInternetPopup = ({ showPopup, hidePopup }) => {
  const handleRetry = () => {
    hidePopup();
    setTimeout(() => {
      const netInfo = useNetInfo();
      const disconnected = !netInfo.isConnected || !netInfo.isInternetReachable;
      if (disconnected) {
        showPopup(AppConst.NO_INTERNET_POPUP);
      }
    });
  };

  return (
    <Dialog
      title={TextPackage.NO_INTERNET}
      confirmText={TextPackage.RETRY}
      cancelText={TextPackage.EXIT}
      handleConfirm={handleRetry}
      handleCancel={() => {
        BackHandler.exitApp();
      }}
    >
      <View>
        <Image style={styles.image} source={require('src/assets/images/no_internet.png')} />
        <Typography gray center>
          {TextPackage.NO_INTERNET_MESSAGE}
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

const mapDispatchToProps = dispatch => ({
  showPopup: (popupType, popupProps) => {
    dispatch(popupActions.showPopup(popupType, popupProps));
  },
  hidePopup: () => {
    dispatch(popupActions.hidePopup());
  }
});

export default connect(null, mapDispatchToProps)(NoInternetPopup);
