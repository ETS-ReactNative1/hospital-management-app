import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { localization, generalStyles } from 'src/constants';
import { actions } from 'src/utils/reduxStore';
import { connect } from 'react-redux';
import AppData from 'src/AppData';
import AppConst from 'src/AppConst';

const TextPackage = localization[AppData.language];

class OkCancelPopup extends Component {
  render() {
    const { popup, hidePopup } = this.props;
    const { type, title, message, okText, okFunc } = popup;
    if (type === AppConst.OK_CANCEL_POPUP)
      return (
        <View>
          <Text style={generalStyles.popup_title}>{title}</Text>
          <View style={generalStyles.divider_1px} />
          <Text style={generalStyles.popup_body}>{message}</Text>
          <View style={generalStyles.popup_group_btn}>
            <TouchableOpacity onPress={hidePopup}>
              <Text style={generalStyles.popup_cancel_btn}>{TextPackage.CANCEL}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={okFunc}>
              <Text style={generalStyles.popup_ok_btn}>{okText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    return <View />;
  }
}

export default connect(
  ({ popup }) => ({ popup }),
  actions
)(OkCancelPopup);
