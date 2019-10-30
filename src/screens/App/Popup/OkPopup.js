import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { generalStyles } from 'src/constants';
import { connect } from 'react-redux';
import AppConst from 'src/AppConst';

const OkPopup = props => {
  const { popup } = props;
  const { type, title, message, okText, okFunc } = popup;
  if (type === AppConst.OK_POPUP)
    return (
      <View>
        <Text style={generalStyles.popup_title}>{title}</Text>
        <View style={generalStyles.divider_1px} />
        <Text style={generalStyles.popup_body}>{message}</Text>
        <View style={generalStyles.popup_group_btn}>
          <TouchableOpacity onPress={okFunc}>
            <Text style={generalStyles.popup_ok_btn}>{okText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  return <View />;
};

export default connect(({ popup }) => ({ popup }))(OkPopup);
