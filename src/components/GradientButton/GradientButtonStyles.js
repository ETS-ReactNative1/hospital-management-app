import { StyleSheet } from 'react-native';

import { theme } from '../../constants';

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.sizes.radius,
    height: theme.sizes.base * 3,
    justifyContent: 'center',
    marginVertical: theme.sizes.padding
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10
  },
  accent: { backgroundColor: theme.colors.accent },
  primary: { backgroundColor: theme.colors.primary },
  secondary: { backgroundColor: theme.colors.secondary },
  tertiary: { backgroundColor: theme.colors.tertiary },
  black: { backgroundColor: theme.colors.black },
  white: { backgroundColor: theme.colors.white },
  gray: { backgroundColor: theme.colors.gray },
  gray2: { backgroundColor: theme.colors.gray2 },
  gray3: { backgroundColor: theme.colors.gray3 },
  gray4: { backgroundColor: theme.colors.gray4 },
  error: { backgroundColor: theme.colors.error }
});

export default styles;
