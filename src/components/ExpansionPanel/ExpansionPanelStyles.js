import { StyleSheet } from 'react-native';
import { theme } from 'src/constants';

export default StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.sizes.radius,
    paddingVertical: theme.sizes.padding,
    marginBottom: theme.sizes.base
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
    paddingHorizontal: theme.sizes.base,
    alignItems: 'center'
  },
  title: {
    flex: 1
  },
  body: {
    overflow: 'hidden',
    paddingHorizontal: theme.sizes.base
  },
  expandedBody: {
    paddingTop: theme.sizes.base
  },
  collapsedBody: {
    height: 0
  }
});
