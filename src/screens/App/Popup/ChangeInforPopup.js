import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Input } from 'src/components';
import { localization, generalStyles } from 'src/constants';
import { actions } from 'src/utils/reduxStore';
import { connect } from 'react-redux';
import AppData from 'src/AppData';
import AppConst from 'src/AppConst';

const TextPackage = localization[AppData.language];

const ChangeInforPopup = props => {
  const { popup, hidePopup } = props;
  const { type, callback } = popup;
  const {
    userProfile: { surname, name, phone }
  } = AppData;
  const [newProfile, setNewProfile] = useState({ surname, name, phone });

  const changeInfor = () => {
    Object.assign(AppData.userProfile, newProfile);
    callback();
  };

  const handleTextChange = (name, text) => {
    setNewProfile({
      ...newProfile,
      [name]: text
    });
  };

  if (type === AppConst.CHANGE_INFOR_POPUP)
    return (
      <View>
        <Text style={generalStyles.popup_title}>{TextPackage.CHANGE_INFOR}</Text>
        <View style={generalStyles.divider_1px} />
        <View style={generalStyles.popup_body}>
          <Text>{TextPackage.SURNAME}</Text>
          <Input
            name="surname"
            defaultValue={surname}
            style={[generalStyles.input]}
            onChangeText={text => handleTextChange('surname', text)}
          />
          <Text>{TextPackage.NAME}</Text>
          <Input
            name="name"
            defaultValue={name}
            style={[generalStyles.input]}
            onChangeText={text => handleTextChange('name', text)}
          />
          <Text>{TextPackage.PHONE}</Text>
          <Input
            name="phone"
            keyboardType="number-pad"
            defaultValue={phone}
            style={[generalStyles.input]}
            onChangeText={text => handleTextChange('phone', text)}
          />
        </View>
        <View style={generalStyles.popup_group_btn}>
          <TouchableOpacity onPress={changeInfor}>
            <Text style={generalStyles.popup_ok_btn}>{TextPackage.COMPLETE}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={hidePopup}>
            <Text style={generalStyles.popup_cancel_btn}>{TextPackage.CANCEL}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  return <View />;
};

export default connect(
  ({ popup }) => ({ popup }),
  actions
)(ChangeInforPopup);
