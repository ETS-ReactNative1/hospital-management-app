import { StyleSheet } from 'react-native';
import { theme } from 'src/constants';

export default StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 56
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 0
  },
  hasErrors: {
    borderBottomColor: theme.colors.error
  },
  bottomBlock: {
    position: 'absolute',
    bottom: 32,
    width: '100%',
    alignSelf: 'center'
  }
});
