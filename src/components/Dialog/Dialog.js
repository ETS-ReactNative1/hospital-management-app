import React from 'react';
import { Modal, StatusBar, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Block from '../Block';
import Card from '../Card';
import Typography from '../Typography';
import Divider from '../Divider';

import { theme, localization } from 'src/constants';
import styles from './DialogStyles';
import AppData from 'src/AppData';
import { connect } from 'react-redux';
import { popupActions } from 'src/redux/actions';

const TextPackage = localization[AppData.language];

const Dialog = props => {
  const {
    title,
    cancelText,
    confirmText,
    hideCancel,
    confirmDisable,
    handleConfirm,
    handleCancel,
    onRequestClose,
    children,
    hidePopup,
    ...other
  } = props;

  return (
    <Modal
      animationType="fade"
      transparent
      visible
      onRequestClose={() => {
        hidePopup();
        onRequestClose && onRequestClose();
      }}
      {...other}
    >
      <StatusBar barStyle="default" backgroundColor={theme.colors.black2} />
      <Block middle padding={[0, theme.sizes.base * 2]} backgroundColor={theme.colors.black2}>
        <Card flex={false} shadow fullWidth>
          {/* Title */}
          <Typography bold h1>
            {title}
          </Typography>
          <Divider />
          {/* Content */}
          {children}
          {/* Action */}
          <Block flex={false} row right>
            {!hideCancel && (
              <TouchableOpacity
                onPress={() => {
                  hidePopup();
                  handleCancel && handleCancel();
                }}
                style={styles.actionButton}
              >
                <Typography uppercase bold body>
                  {cancelText}
                </Typography>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => {
                hidePopup();
                handleConfirm && handleConfirm();
              }}
              disabled={confirmDisable}
              style={styles.actionButton}
            >
              <Typography uppercase bold body primary disabled={confirmDisable}>
                {confirmText}
              </Typography>
            </TouchableOpacity>
          </Block>
        </Card>
      </Block>
    </Modal>
  );
};

Dialog.propTypes = {
  title: PropTypes.string,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  hideCancel: PropTypes.bool,
  confirmDisable: PropTypes.bool,
  handleCancel: PropTypes.func,
  handleConfirm: PropTypes.func,
  onRequestClose: PropTypes.func
};

Dialog.defaultProps = {
  title: TextPackage.TITLE,
  cancelText: TextPackage.CANCEL,
  confirmText: TextPackage.CONFIRM,
  hideCancel: false,
  confirmDisable: false,
  handleCancel: null,
  handleConfirm: null,
  onRequestClose: null
};

const mapDispatchToProps = dispatch => ({
  hidePopup: () => {
    dispatch(popupActions.hidePopup());
  }
});

export default connect(null, mapDispatchToProps)(Dialog);
