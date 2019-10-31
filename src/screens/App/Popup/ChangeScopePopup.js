import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { localization, generalStyles } from 'src/constants';
import { actions } from 'src/utils/reduxStore';
import { connect } from 'react-redux';
import AppData from 'src/AppData';
import AppConst from 'src/AppConst';

const TextPackage = localization[AppData.language];

const scopes = ['Người dùng', 'Quản lý', 'Kiểm toán'];

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#794F9B'
  }
});

const ChangeScopePopup = props => {
  const { popup, hidePopup } = props;
  const { type, callback } = popup;
  const {
    userProfile: { scope }
  } = AppData;
  const [newScope, setNewScope] = useState(scope);

  const changeScope = () => {
    AppData.userProfile.scope = newScope;
    callback();
  };

  if (type === AppConst.CHANGE_SCOPE_POPUP)
    return (
      <View>
        <Text style={generalStyles.popup_title}>{TextPackage.CHANGE_INFOR}</Text>
        <View style={generalStyles.divider_1px} />
        <View style={generalStyles.popup_body}>
          {scopes.map(scope => {
            console.log(scope);
            return (
              <View key={scope} style={styles.buttonContainer}>
                <Text>{scope}</Text>
                <TouchableOpacity style={styles.circle} onPress={() => setNewScope(scope)}>
                  {newScope === scope && <View style={styles.checkedCircle} />}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <View style={generalStyles.popup_group_btn}>
          <TouchableOpacity onPress={changeScope}>
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
)(ChangeScopePopup);
