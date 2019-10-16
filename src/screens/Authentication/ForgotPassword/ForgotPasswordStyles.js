import { StyleSheet } from 'react-native';
import { theme } from '../../../constants';

export default StyleSheet.create({
  forgot: {
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.error
  }
});
