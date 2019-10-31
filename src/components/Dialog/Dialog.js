import React from 'react';
import { Modal, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { Block, Card, Typography, Divider, GradientButton } from '..';
import { theme, localization } from 'src/constants';
import styles from './DialogStyles';
import AppData from 'src/AppData';

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
    visible,
    ...other
  } = props;

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={handleCancel}
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
              <GradientButton onPress={handleCancel} style={styles.actionButton}>
                <Typography uppercase bold body color={theme.colors.gray}>
                  {cancelText}
                </Typography>
              </GradientButton>
            )}

            <GradientButton
              onPress={handleConfirm}
              disable={confirmDisable}
              style={styles.actionButton}
            >
              <Typography uppercase bold body primary>
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
  visible: PropTypes.bool.isRequired,
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
  handleCancel: () => console.log('cancle pressed'),
  handleConfirm: () => console.log('confirm pressed')
};

export default Dialog;
