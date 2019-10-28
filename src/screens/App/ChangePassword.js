import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { theme, localization, generalStyles } from 'src/constants';
import AppData from 'src/AppData';
import AppConst from 'src/AppConst';

const TextPackage = localization[AppData.language];

export default class ChangePassword extends Component {
  render() {
    return (
      <View>
        <Text style={generalStyles.popup_title}>{TextPackage.CHANGE_PASSWORD}</Text>
        <View style={generalStyles.divider_1px} />
        <View style={generalStyles.popup_body} />
        <View style={generalStyles.popup_group_btn}>
          <TouchableOpacity onPress={console.log('CLOSE POPUP')}>
            <Text style={generalStyles.popup_cancel_btn}>{TextPackage.CANCEL}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={console.log('CHANGE PASSWORD')}>
            <Text style={generalStyles.popup_ok_btn}>{TextPackage.SURE}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
