import { StyleSheet } from 'react-native';

import { theme } from 'src/constants';

const styles = StyleSheet.create({
  divider: {
    height: 0,
    marginVertical: theme.sizes.base,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});

export default styles;
