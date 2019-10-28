import React, { Component } from 'react';
import { View, Modal, TouchableOpacity, KeyboardAvoidingView, Text } from 'react-native';
import { theme, localization, generalStyles } from 'src/constants';
import AppData from 'src/AppData';
import AppConst from 'src/AppConst';

const TextPackage = localization[AppData.language];

const CancelBtn = props => (
  <TouchableOpacity onPress={props.onPress}>
    <Text style={generalStyles.popup_ok_btn}>{TextPackage.CANCEL}</Text>
  </TouchableOpacity>
);

const OkBtn = props => (
  <TouchableOpacity onPress={props.onPress}>
    <Text style={generalStyles.popup_cancel_btn}>{props.okText}</Text>
  </TouchableOpacity>
);

const PopupContent = props => {
  const { popupConfig, closePopup } = props;
  switch (popupConfig.type) {
    case AppConst.OK_CANCEL_POPUP:
      return (
        <View>
          <Text style={generalStyles.popup_title}>{popupConfig.title}</Text>
          <View style={generalStyles.divider_1px} />
          <Text style={generalStyles.popup_body}>{popupConfig.message}</Text>
          <View style={generalStyles.popup_group_btn}>
            <CancelBtn onPress={closePopup} />
            <OkBtn onPress={popupConfig.okFunc} okText={popupConfig.okText} />
          </View>
        </View>
      );
    case AppConst.OK_POPUP:
    case AppConst.CHANGE_PASS_POPUP:
    case AppConst.CHANGE_INFOR_POPUP:
    case AppConst.CHANGE_SCOPE_POPUP:
    default:
      return <CancelBtn onPress={closePopup} />;
  }
};

export default class Popup extends Component {
  render() {
    const { popupConfig, closePopup } = this.props;
    return (
      <Modal animationType="slide" transparent visible={popupConfig.type !== AppConst.NO_POPUP}>
        <View style={[generalStyles.screen_container, { backgroundColor: theme.colors.black2 }]}>
          <KeyboardAvoidingView style={generalStyles.popup_container}>
            <PopupContent popupConfig={popupConfig} closePopup={closePopup} />
          </KeyboardAvoidingView>
        </View>
      </Modal>
    );
  }
}
