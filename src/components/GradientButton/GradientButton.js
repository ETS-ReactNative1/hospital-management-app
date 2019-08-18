import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './GradientButtonStyles';
import { theme } from '../../constants';

class GradientButton extends Component {
  render() {
    const {
      style,
      opacity,
      gradient,
      border,
      color,
      startColor,
      endColor,
      end,
      start,
      locations,
      shadow,
      children,
      ...props
    } = this.props;

    const buttonStyles = [
      styles.button,
      shadow && styles.shadow,
      color && styles[color], // predefined styles colors for backgroundColor
      color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
      border && { borderColor: theme.colors.gray2, borderWidth: 2 }, // button border
      style
    ];

    return (
      <TouchableOpacity style={buttonStyles} activeOpacity={opacity} {...props}>
        {gradient ? (
          <LinearGradient
            start={start}
            end={end}
            locations={locations}
            style={buttonStyles}
            colors={[startColor, endColor]}
          >
            {children}
          </LinearGradient>
        ) : (
          children
        )}
      </TouchableOpacity>
    );
  }
}

GradientButton.defaultProps = {
  startColor: theme.colors.primary,
  endColor: theme.colors.secondary,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
  locations: [0.1, 0.9],
  opacity: 0.8,
  color: theme.colors.white
};

export default GradientButton;
