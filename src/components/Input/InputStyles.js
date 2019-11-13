import { StyleSheet } from 'react-native';

import { theme } from 'src/constants';

const styles = StyleSheet.create({
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.black,
    fontSize: theme.sizes.body,
    fontWeight: 'bold',
    color: theme.colors.black,
    height: theme.sizes.padding * 5,
    marginBottom: theme.sizes.padding
  },
  toggle: {
    position: 'absolute',
    alignItems: 'center',
    width: theme.sizes.padding * 4,
    height: theme.sizes.padding * 3,
    right: 0,
    paddingTop: theme.sizes.padding
  }
});

export default styles;
