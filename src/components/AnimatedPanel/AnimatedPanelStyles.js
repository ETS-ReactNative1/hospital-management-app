import { StyleSheet } from 'react-native';
import { theme } from 'src/constants';

export default StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    margin: theme.sizes.base,
    overflow: 'hidden',
    borderRadius: theme.sizes.radius
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: theme.sizes.radius,
    elevation: 10
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.sizes.base * 3.5,
    paddingHorizontal: theme.sizes.base
  },
  title: {
    flex: 1
  },
  body: {
    padding: 10,
    paddingTop: 0
  }
});
