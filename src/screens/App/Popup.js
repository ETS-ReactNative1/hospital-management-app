import React, { Component } from 'react';
import { View, Modal, TouchableOpacity, KeyboardAvoidingView, Text } from 'react-native';
import { theme, localization, generalStyles } from 'src/constants';
import AppData from 'src/AppData';
import AppConst from 'src/AppConst';
import ChangePassword from './ChangePassword';

const TextPackage = localization[AppData.language];

const PopupContent = props => {
  const { popupConfig, closePopup } = props;
  const { type, title, message, okText, okFunc } = popupConfig;
  switch (type) {
    case AppConst.OK_CANCEL_POPUP:
    case AppConst.OK_POPUP:
      return (
        <View>
          <Text style={generalStyles.popup_title}>{title}</Text>
          <View style={generalStyles.divider_1px} />
          <Text style={generalStyles.popup_body}>{message}</Text>
          <View style={generalStyles.popup_group_btn}>
            <TouchableOpacity onPress={closePopup} visible={type === AppConst.OK_CANCEL_POPUP}>
              <Text style={generalStyles.popup_cancel_btn}>{TextPackage.CANCEL}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={okFunc}>
              <Text style={generalStyles.popup_ok_btn}>{okText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    case AppConst.CHANGE_PASS_POPUP:
      return <ChangePassword />;
    case AppConst.CHANGE_INFOR_POPUP:
    case AppConst.CHANGE_SCOPE_POPUP:
    default:
      return <View />;
  }
};

export default class Popup extends Component {
  render() {
    const { popupConfig, closePopup } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent
        visible={popupConfig.type !== AppConst.NO_POPUP}
        onRequestClose={() => {
          closePopup();
        }}
      >
        <View style={[generalStyles.screen_container, { backgroundColor: theme.colors.black2 }]}>
          <KeyboardAvoidingView style={generalStyles.popup_container}>
            <PopupContent popupConfig={popupConfig} closePopup={closePopup} />
          </KeyboardAvoidingView>
        </View>
      </Modal>
    );
  }
}
