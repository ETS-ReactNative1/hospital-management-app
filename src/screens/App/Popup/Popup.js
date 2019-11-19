import React from 'react';
import { connect } from 'react-redux';
import AppConst from 'src/AppConst';
import ChangePassPopup from './ChangePassPopup';
import ChangeInfoPopup from './ChangeInfoPopup';
import ErrorPopup from './ErrorPopup';
import NoPermissionPopup from './NoPermissionPopup';
import NoInternetPopup from './NoInternetPopup';
import NoActivePopup from './NoActivePopup';
import { Dialog, Typography } from 'src/components';

const Popup = ({ popupType, popupProps }) => {
  switch (popupType) {
    default:
    case AppConst.NO_POPUP:
      return null;
    case AppConst.OK_POPUP:
    case AppConst.OK_CANCEL_POPUP:
      const { message, ...otherProps } = popupProps;
      return (
        <Dialog hideCancel={popupType === AppConst.OK_POPUP} {...otherProps}>
          <Typography body justify>
            {message}
          </Typography>
        </Dialog>
      );
    case AppConst.ERROR_POPUP:
      return <ErrorPopup {...popupProps} />;
    case AppConst.CHANGE_PASS_POPUP:
      return <ChangePassPopup {...popupProps} />;
    case AppConst.CHANGE_INFO_POPUP:
      return <ChangeInfoPopup {...popupProps} />;
    case AppConst.NO_PERMISSION_POPUP:
      return <NoPermissionPopup {...popupProps} />;
    case AppConst.NO_INTERNET_POPUP:
      return <NoInternetPopup {...popupProps} />;
    case AppConst.NO_ACTIVE_POPUP:
      return <NoActivePopup {...popupProps} />;
  }
};

const mapStateToProps = state => state.popup;

export default connect(mapStateToProps)(Popup);
