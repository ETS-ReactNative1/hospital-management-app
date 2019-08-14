import React, { Component } from 'react';
import { TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './InputStyles';
import Typography from '../Typography/Typography';
import Block from '../Block/Block';
import GradientButton from '../GradientButton/GradientButton';
import { theme } from '../../constants';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleSecure: false
    };
  }

  renderLabel() {
    const { label, error } = this.props;
    return (
      <Block flex={false}>
        {label ? (
          <Typography gray2={!error} accent={error}>
            {label}
          </Typography>
        ) : null}
      </Block>
    );
  }

  renderToggle() {
    const { secure, rightLabel } = this.props;
    const { toggleSecure } = this.state;

    if (!secure) return null;

    return (
      <GradientButton
        style={styles.toggle}
        onPress={() => this.setState({ toggleSecure: !toggleSecure })}
      >
        {rightLabel || (
          <Icon
            color={theme.colors.gray}
            size={theme.sizes.font * 1.35}
            name={!toggleSecure ? 'visibility' : 'visibility-off'}
          />
        )}
      </GradientButton>
    );
  }

  renderRight() {
    const { rightLabel, rightStyle, onRightPress } = this.props;

    if (!rightLabel) return null;

    return (
      <GradientButton
        style={[styles.toggle, rightStyle]}
        onPress={() => onRightPress && onRightPress()}
      >
        {rightLabel}
      </GradientButton>
    );
  }

  render() {
    const { email, phone, number, secure, error, style, ...props } = this.props;

    const { toggleSecure } = this.state;
    const isSecure = toggleSecure ? false : secure;

    const inputStyles = [styles.input, error && { borderColor: theme.colors.accent }, style];

    let inputType = 'default';
    if (email) {
      inputType = 'email-address';
    } else if (number) {
      inputType = 'numeric';
    } else if (phone) {
      inputType = 'phone-pad';
    }

    return (
      <Block flex={false} margin={[theme.sizes.base, 0]}>
        {this.renderLabel()}
        <TextInput
          style={inputStyles}
          secureTextEntry={isSecure}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={inputType}
          {...props}
        />
        {this.renderToggle()}
        {this.renderRight()}
      </Block>
    );
  }
}
