import React, { Component } from 'react';

import { theme } from 'src/constants';
import Block from '../Block';
import styles from './CardStyles';

export default class Card extends Component {
  render() {
    const { color, style, children, ...props } = this.props;
    const cardStyles = [styles.card, style];

    return (
      <Block color={color || theme.colors.white} style={cardStyles} {...props}>
        {children}
      </Block>
    );
  }
}
