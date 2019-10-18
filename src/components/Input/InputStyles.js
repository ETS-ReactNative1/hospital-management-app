import { StyleSheet } from 'react-native';

import { theme } from 'src/constants';

const styles = StyleSheet.create({
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.black,
    borderRadius: theme.sizes.radius,
    fontSize: theme.sizes.font,
    fontWeight: 'bold',
    color: theme.colors.black,
    height: theme.sizes.base * 3,
    marginBottom: theme.sizes.base * 0.5
  },
  toggle: {
    position: 'absolute',
    alignItems: 'center',
    width: theme.sizes.base * 2,
    height: theme.sizes.base * 2,
    right: 0
  }
});

export default styles;
