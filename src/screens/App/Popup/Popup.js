import React from 'react';
import { connect } from 'react-redux';
import AppConst from 'src/AppConst';
import ChangePassPopup from './ChangePassPopup';
import ChangeInfoPopup from './ChangeInfoPopup';
import ErrorPopup from './ErrorPopup';
import { Dialog, Typography } from 'src/components';
import { popupActions } from 'src/redux/actions';

const Popup = ({ popupType, popupProps, hidePopup }) => {
  switch (popupType) {
    default:
    case AppConst.NO_POPUP:
      return null;
    case AppConst.OK_POPUP:
    case AppConst.OK_CANCEL_POPUP:
      const { message, ...otherProps } = popupProps;
      return (
        <Dialog
          hideCancel={popupType === AppConst.OK_POPUP}
          onRequestClose={popupType === AppConst.OK_CANCEL_POPUP && hidePopup}
          {...otherProps}
        >
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
  }
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
)(Popup);
