import React, { Component } from 'react';

import styles from './DividerStyles';
import Block from '../Block';
import { theme } from 'src/constants';

export default class Divider extends Component {
  render() {
    const { color, style, ...props } = this.props;
    const dividerStyles = [styles.divider, style];

    return <Block color={color || theme.colors.gray2} style={dividerStyles} {...props} />;
  }
}
