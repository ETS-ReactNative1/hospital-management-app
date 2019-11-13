import { StyleSheet } from 'react-native';
import { sizes, colors } from './theme';

const generalStyles = StyleSheet.create({
  screen_container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: sizes.base * 2,
    paddingRight: sizes.base * 2,
    paddingTop: sizes.base * 2,
    paddingBottom: sizes.base * 2
  },
  popup_container: {
    paddingBottom: sizes.padding * 2,
    paddingTop: sizes.padding * 2,
    paddingLeft: sizes.padding * 3,
    paddingRight: sizes.padding * 3,
    backgroundColor: colors.white,
    width: '100%',
    borderRadius: 10
  },
  divider_1px: {
    width: '100%',
    height: 1,
    backgroundColor: colors.gray2
  },
  divider_5px: {
    width: '100%',
    height: 5,
    backgroundColor: colors.gray2,
    marginTop: sizes.padding
  },
  popup_title: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: sizes.title
  },
  popup_body: {
    textTransform: 'none',
    marginTop: sizes.padding * 2,
    marginBottom: sizes.padding * 2,
    fontSize: sizes.body
  },
  popup_group_btn: {
    flexDirection: 'row-reverse'
  },
  popup_ok_btn: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: colors.green,
    marginRight: sizes.padding,
    marginLeft: sizes.padding
  },
  popup_cancel_btn: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: colors.gray,
    marginRight: sizes.padding,
    marginLeft: sizes.padding
  },
  title_infor: {
    paddingTop: sizes.padding,
    textTransform: 'capitalize',
    fontWeight: 'bold'
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  actionButtons: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  hasErrors: {
    borderBottomColor: colors.error
  }
});

export default generalStyles;
