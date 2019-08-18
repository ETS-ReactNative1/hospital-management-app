import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './CustomButtonStyles';

const CustomButton = props => {
  const { title, style, textStyle, onPress, iconName } = props;
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      {iconName ? (
        <Icon name={iconName} size={16} color="#FFFFFF" style={{ paddingRight: 2 }} />
      ) : null}
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  textStyle: PropTypes.object,
  iconName: PropTypes.string,
  onPress: PropTypes.func
};

const defaultProps = {
  title: 'Button',
  style: styles.button,
  textStyle: styles.text,
  iconName: null,
  onPress: () => {}
};

CustomButton.propTypes = propTypes;
CustomButton.defaultProps = defaultProps;

export default CustomButton;
