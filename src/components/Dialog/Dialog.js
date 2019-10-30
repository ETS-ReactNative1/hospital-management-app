import React, { Component } from 'react';
import { Modal, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { Block, Card, Typography, Divider, GradientButton } from '..';
import { theme } from 'src/constants';
import styles from './DialogStyles';

export default class Dialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  setVisible = boolean => {
    this.setState({ visible: boolean });
  };

  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      this.setVisible(this.props.visible);
    }
  }

  render() {
    const {
      title,
      cancelText,
      confirmText,
      hideCancel,
      confirmDisable,
      handleConfirm,
      children
    } = this.props;
    const { visible } = this.state;
    return (
      <Modal
        onRequestClose={() => {
          !hideCancel && this.setVisible(!visible);
        }}
        animationType="slide"
        transparent
        visible={visible}
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
                <GradientButton onPress={() => this.setVisible(false)} style={styles.actionButton}>
                  <Typography uppercase bold body color={theme.colors.gray}>
                    {cancelText}
                  </Typography>
                </GradientButton>
              )}

              <GradientButton
                onPress={handleConfirm}
                disalbe={confirmDisable}
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
  }
}

Dialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  hideCancel: PropTypes.bool,
  confirmDisable: PropTypes.bool,
  handleConfirm: PropTypes.func
};

Dialog.defaultProps = {
  title: 'Tiêu đề',
  cancelText: 'Hủy bỏ',
  confirmText: 'Xác nhận',
  hideCancel: false,
  confirmDisable: false,
  handleConfirm: () => console.log('confirm pressed')
};
