import React from 'react';
import { Modal, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import Block from '../Block';
import Card from '../Card';
import Typography from '../Typography';
import Divider from '../Divider';
import GradientButton from '../GradientButton';

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
    children,
    hidePopup,
    ...other
  } = props;

  return (
    <Modal animationType="fade" transparent visible onRequestClose={handleCancel} {...other}>
      <StatusBar barStyle="default" backgroundColor={theme.colors.black2} />
      <Block middle padding={[0, theme.sizes.base * 2]} backgroundColor={theme.colors.black2}>
        <Card style={styles.cardStyle} flex={false} shadow fullWidth>
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
              <GradientButton onPress={handleCancel || hidePopup} style={styles.actionButton}>
                <Typography uppercase bold body>
                  {cancelText}
                </Typography>
              </GradientButton>
            )}

            <GradientButton
              onPress={handleConfirm || hidePopup}
              disable={confirmDisable}
              style={styles.actionButton}
            >
              <Typography uppercase bold body primary disable={confirmDisable}>
                {confirmText}
              </Typography>
            </GradientButton>
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
  handleConfirm: PropTypes.func
};

Dialog.defaultProps = {
  title: TextPackage.TITLE,
  cancelText: TextPackage.CANCEL,
  confirmText: TextPackage.CONFIRM,
  hideCancel: false,
  confirmDisable: false,
  handleCancel: null,
  handleConfirm: null
};

const mapDispatchToProps = dispatch => ({
  hidePopup: () => {
    dispatch(popupActions.hidePopup());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Dialog);
