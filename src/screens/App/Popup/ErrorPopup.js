import React from 'react';
import { View } from 'react-native';
import { localization } from 'src/constants';
import { popupActions } from 'src/redux/actions';
import { connect } from 'react-redux';
import AppData from 'src/AppData';
import AppConst from 'src/AppConst';

const TextPackage = localization[AppData.language];

const ErrorHandle = errorMsg => {
  if (errorMsg.indexOf('Email is already taken') !== -1) {
    return {
      title: TextPackage.EMAIL_IS_TAKEN_ERR_TITLE,
      message: TextPackage.EMAIL_IS_TAKEN_ERR_MESSAGE,
      okText: TextPackage.CONTINUE
    };
  }

  if (errorMsg.indexOf('Network request failed') !== -1) {
    return {
      title: TextPackage.NO_INTERNET_ERR_TITLE,
      message: TextPackage.NO_INTERNET_ERR_MESSAGE,
      okText: TextPackage.CONTINUE
    };
  }

  if (errorMsg.indexOf('User still does not confirmed email') !== -1) {
    return {
      title: TextPackage.SIGN_IN_ERR,
      message: TextPackage.UNCONFIRMED_EMAIL_ERR,
      okText: TextPackage.CONTINUE
    };
  }

  if (errorMsg.indexOf('Invalid password') !== -1) {
    return {
      title: TextPackage.SIGN_IN_ERR,
      message: TextPackage.INVALID_PASSWORD_ERR,
      okText: TextPackage.CONTINUE
    };
  }

  return {
    title: TextPackage.UNDEFINED_ERR_TITLE,
    message: TextPackage.UNDEFINED_ERR_MESSAGE,
    okText: TextPackage.CONTINUE
  };
};

const ErrorPopup = props => {
  const { popup, showPopup } = props;
  const { type, errorMsg } = popup;
  if (type === AppConst.ERROR_POPUP) {
    const errorPopupContent = { type: AppConst.OK_POPUP };
    Object.assign(errorPopupContent, ErrorHandle(errorMsg));
    showPopup(errorPopupContent);
  }
  return <View />;
};

export default connect(
  ({ popup }) => ({ popup }),
  popupActions
)(ErrorPopup);
