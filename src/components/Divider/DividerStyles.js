import { StyleSheet } from 'react-native';

import { theme } from '../../constants';

const styles = StyleSheet.create({
  divider: {
    height: 0,
    margin: theme.sizes.base * 2,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});

export default styles;
