import { StyleSheet } from 'react-native';
import { theme } from 'src/constants';

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.sizes.radius,
    padding: theme.sizes.padding * 3,
    marginBottom: theme.sizes.base
  }
});

export default styles;
