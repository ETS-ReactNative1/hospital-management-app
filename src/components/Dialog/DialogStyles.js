import { StyleSheet } from 'react-native';
import { theme } from 'src/constants';

const styles = StyleSheet.create({
  actionButton: {
    paddingHorizontal: theme.sizes.padding,
    marginBottom: 0,
    marginLeft: theme.sizes.padding * 2,
    marginRight: -theme.sizes.padding,
    height: theme.sizes.base * 3,
    justifyContent: 'center',
    marginVertical: theme.sizes.padding
  },
  cardStyle: {
    paddingBottom: theme.sizes.padding
  }
});

export default styles;
