import { StyleSheet } from 'react-native';
import { theme } from '../../../constants';

export default StyleSheet.create({
  login: {
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
  },
  forgotPasswordStyle: {
    height: 24
  },
  textStyle: {
    marginTop: 48
  },
  bottomBlock: { position: 'absolute', bottom: 32, width: '100%', alignSelf: 'center' }
});
