import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { localization, generalStyles } from 'src/constants';
import { actions } from 'src/utils/reduxStore';
import { connect } from 'react-redux';
import AppData from 'src/AppData';
import AppConst from 'src/AppConst';

const TextPackage = localization[AppData.language];

class ChangePassPopup extends Component {
  changePass() {
    const { hidePopup } = this.props;
    hidePopup();
  }

  render() {
    const { popup, hidePopup } = this.props;
    if (popup.type === AppConst.CHANGE_PASS_POPUP)
      return (
        <View>
          <Text style={generalStyles.popup_title}>{TextPackage.CHANGE_PASSWORD}</Text>
          <View style={generalStyles.divider_1px} />
          <Text style={generalStyles.popup_body}>{}</Text>
          <View style={generalStyles.popup_group_btn}>
            <TouchableOpacity onPress={hidePopup}>
              <Text style={generalStyles.popup_cancel_btn}>{TextPackage.CANCEL}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={generalStyles.popup_ok_btn}>{TextPackage.COMPLETE}</Text>
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
)(ChangePassPopup);
