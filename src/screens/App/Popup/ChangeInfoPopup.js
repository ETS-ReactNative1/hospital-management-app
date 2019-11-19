import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import { useMutation } from 'react-apollo';

import { Input, Dialog } from 'src/components';
import { localization, generalStyles } from 'src/constants';
import { popupActions, meActions } from 'src/redux/actions';
import { connect } from 'react-redux';
import AppData from 'src/AppData';
import AppConst from 'src/AppConst';
import { UPDATE_USER } from 'src/utils/graphqlMutations';
import graphqlErrorHandler from 'src/utils/graphqlErrorHandler';

const TextPackage = localization[AppData.language];

const ChangeInfoPopup = ({ showPopup, updateMe, userInfo: { firstName, lastName, phone } }) => {
  const [newProfile, setNewProfile] = useState({ firstName, lastName, phone });
  const firstNameRef = useRef();
  const phoneRef = useRef();
  const [updateUser] = useMutation(UPDATE_USER);

  const handleChangeInfo = async () => {
    try {
      await updateUser({ variables: { userInput: newProfile } });
      updateMe(newProfile);
      showPopup(AppConst.OK_POPUP, {
        title: TextPackage.CHANGE_SUCCESS,
        message: TextPackage.CHANGE_INFO_SUCCESSFUL_MESSAGE,
        confirmText: TextPackage.CONTINUE
      });
    } catch (error) {
      graphqlErrorHandler(error);
    }
  };

  const handleTextChange = (name, text) => {
    setNewProfile({
      ...newProfile,
      [name]: text
    });
  };
  return (
    <Dialog
      title={TextPackage.CHANGE_INFO}
      confirmText={TextPackage.COMPLETE}
      handleConfirm={handleChangeInfo}
    >
      <View>
        <Input
          name="lastName"
          label={TextPackage.SURNAME}
          defaultValue={lastName}
          style={[generalStyles.input]}
          onChangeText={text => handleTextChange('lastName', text)}
          onEndEditing={() => firstNameRef.current.textInputRef.current.focus()}
        />
        <Input
          name="firstName"
          label={TextPackage.NAME}
          defaultValue={firstName}
          style={[generalStyles.input]}
          onChangeText={text => handleTextChange('firstName', text)}
          onEndEditing={() => phoneRef.current.textInputRef.current.focus()}
          ref={firstNameRef}
        />
        <Input
          name="phone"
          label={TextPackage.PHONE}
          defaultValue={phone}
          style={[generalStyles.input]}
          onChangeText={text => handleTextChange('phone', text)}
          ref={phoneRef}
        />
      </View>
    </Dialog>
  );
};

const mapStateToProps = state => ({
  userInfo: state.me
});

const mapDispatchToProps = dispatch => ({
  showPopup: (popupType, popupProps) => {
    dispatch(popupActions.showPopup(popupType, popupProps));
  },
  updateMe: me => {
    dispatch(meActions.updateMe(me));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeInfoPopup);
