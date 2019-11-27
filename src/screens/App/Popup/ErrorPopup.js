import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { localization } from 'src/constants';
import { connect } from 'react-redux';
import AppData from 'src/AppData';
import { Typography, Dialog } from 'src/components';

const TextPackage = localization[AppData.language];

const handleError = (errorMsg, path) => {
  if (errorMsg.indexOf('Email is already taken') !== -1) {
    return {
      title: TextPackage.EMAIL_IS_TAKEN_ERR,
      message: TextPackage.EMAIL_IS_TAKEN_ERR_MESSAGE,
      confirmText: TextPackage.UNDERSTOOD
    };
  }

  if (errorMsg.indexOf('User still does not confirmed email') !== -1) {
    return {
      title: TextPackage.SIGN_IN_ERR,
      message: TextPackage.UNCONFIRMED_EMAIL_ERR,
      confirmText: TextPackage.UNDERSTOOD
    };
  }

  if (errorMsg.indexOf('No user found') !== -1) {
    if (path === 'signIn') {
      return {
        title: TextPackage.SIGN_IN_ERR,
        message: TextPackage.INVALID_EMAIL_ERR,
        confirmText: TextPackage.UNDERSTOOD
      };
    }
    return {
      title: TextPackage.ERROR,
      message: TextPackage.EMAIL_NOT_EXIST_ERR,
      confirmText: TextPackage.UNDERSTOOD
    };
  }

  if (errorMsg.indexOf('Invalid password') !== -1) {
    return {
      title: TextPackage.SIGN_IN_ERR,
      message: TextPackage.INVALID_PASSWORD_ERR,
      confirmText: TextPackage.UNDERSTOOD
    };
  }

  if (errorMsg.indexOf('Invalid old password') !== -1) {
    return {
      title: TextPackage.VALIDATION_ERR,
      message: TextPackage.INVALID_OLD_PASSWORD_ERR,
      confirmText: TextPackage.UNDERSTOOD
    };
  }

  if (errorMsg.indexOf('No device found') !== -1) {
    return {
      title: TextPackage.NO_DEVICE_FOUND_ERR,
      message: TextPackage.NO_DEVICE_FOUND_ERR_MESSAGE,
      confirmText: TextPackage.BACK
    };
  }

  if (errorMsg.indexOf('Database leaked') !== -1) {
    return {
      title: TextPackage.DATABASE_LEAKED_ERR,
      message: TextPackage.DATABASE_LEAKED_ERR_MESSAGE
    };
  }

  if (errorMsg.indexOf('Response not successful: Received status code 400') !== -1) {
    return {
      title: TextPackage.NO_INTERNET_ERR_TITLE,
      message: TextPackage.NO_INTERNET_ERR_MESSAGE,
      confirmText: TextPackage.UNDERSTOOD
    };
  }

  if (errorMsg.indexOf('Network request failed') !== -1) {
    return {
      title: TextPackage.TIMEOUT_ERR,
      message: TextPackage.TIMEOUT_ERR_MESSAGE,
      confirmText: TextPackage.UNDERSTOOD
    };
  }

  return {
    title: TextPackage.UNDEFINED_ERR_TITLE,
    message: TextPackage.UNDEFINED_ERR_MESSAGE,
    confirmText: TextPackage.CONTINUE
  };
};

const ErrorPopup = ({ popupProps }) => {
  const { message, ...otherProps } = handleError(popupProps.errorMsg, popupProps.path);

  return (
    <Dialog
      hideCancel
      onRequestClose={popupProps.handleConfirm}
      handleConfirm={popupProps.handleConfirm}
      {...otherProps}
    >
      {popupProps.errorMsg.indexOf('No device found') !== -1 && (
        <Image style={styles.image} source={require('src/assets/images/not_found.png')} />
      )}
      <Typography body justify>
        {message}
      </Typography>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'center'
  }
});

const mapStateToProps = state => state.popup;

export default connect(mapStateToProps)(ErrorPopup);
