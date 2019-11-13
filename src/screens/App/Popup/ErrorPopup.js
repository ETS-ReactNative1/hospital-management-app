import React from 'react';
import { localization } from 'src/constants';
import { popupActions } from 'src/redux/actions';
import { connect } from 'react-redux';
import AppData from 'src/AppData';
import { Typography, Dialog } from 'src/components';

const TextPackage = localization[AppData.language];

const handleError = errorMsg => {
  if (errorMsg.indexOf('Email is already taken') !== -1) {
    return {
      title: TextPackage.EMAIL_IS_TAKEN_ERR_TITLE,
      message: TextPackage.EMAIL_IS_TAKEN_ERR_MESSAGE,
      confirmText: TextPackage.CONTINUE
    };
  }

  if (errorMsg.indexOf('Network request failed') !== -1) {
    return {
      title: TextPackage.NO_INTERNET_ERR_TITLE,
      message: TextPackage.NO_INTERNET_ERR_MESSAGE,
      confirmText: TextPackage.TRY_AGAIN
    };
  }

  if (errorMsg.indexOf('User still does not confirmed email') !== -1) {
    return {
      title: TextPackage.SIGN_IN_ERR,
      message: TextPackage.UNCONFIRMED_EMAIL_ERR,
      confirmText: TextPackage.CONTINUE
    };
  }

  if (errorMsg.indexOf('Invalid password') !== -1) {
    return {
      title: TextPackage.SIGN_IN_ERR,
      message: TextPackage.INVALID_PASSWORD_ERR,
      confirmText: TextPackage.CONTINUE
    };
  }

  if (errorMsg.indexOf('Invalid old password') !== -1) {
    return {
      title: TextPackage.SIGN_IN_ERR,
      message: TextPackage.INVALID_OLD_PASSWORD_ERR,
      confirmText: TextPackage.CONTINUE
    };
  }

  return {
    title: TextPackage.UNDEFINED_ERR_TITLE,
    message: TextPackage.UNDEFINED_ERR_MESSAGE,
    confirmText: TextPackage.CONTINUE
  };
};

const ErrorPopup = ({ popupProps, hidePopup }) => {
  const { message, ...otherProps } = handleError(popupProps.errorMsg);

  return (
    <Dialog hideCancel onRequestClose={hidePopup} {...otherProps}>
      <Typography body justify>
        {message}
      </Typography>
    </Dialog>
  );
};

const mapStateToProps = state => state.popup;

const mapDispatchToProps = dispatch => ({
  hidePopup: () => {
    dispatch(popupActions.hidePopup());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorPopup);
