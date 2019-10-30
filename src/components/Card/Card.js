import React, { Component } from 'react';

import { theme } from 'src/constants';
import Block from '../Block';
import styles from './CardStyles';

export default class Card extends Component {
  render() {
    const { color, style, children, fullWidth, ...props } = this.props;
    const cardStyles = [styles.card, fullWidth && { width: '100%' }, style];

    return (
      <Block color={color || theme.colors.white} style={cardStyles} {...props}>
        {children}
      </Block>
    );
  }
}
