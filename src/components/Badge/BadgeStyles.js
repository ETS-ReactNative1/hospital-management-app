import { StyleSheet } from 'react-native';
import { theme } from 'src/constants';

const styles = StyleSheet.create({
  badge: {
    height: theme.sizes.base,
    width: theme.sizes.base,
    borderRadius: theme.sizes.border
  }
});

export default styles;
