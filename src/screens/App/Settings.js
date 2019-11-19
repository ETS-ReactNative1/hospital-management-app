import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { useMutation } from 'react-apollo';
import { connect } from 'react-redux';

import { GradientButton, Block, Typography, Divider } from 'src/components';
import { theme, localization } from 'src/constants';
import { AVATAR_UPLOAD, SIGN_OUT } from 'src/utils/graphqlMutations';
import AppData from 'src/AppData';
import AppConst from 'src/AppConst';
import ImagePicker from 'react-native-image-picker';
import { ReactNativeFile } from 'apollo-upload-client';
import { meActions, popupActions } from 'src/redux/actions';

const styles = StyleSheet.create({
  image: {
    width: theme.sizes.avatar,
    height: theme.sizes.avatar,
    borderRadius: theme.sizes.avatar * 0.5
  },
  actionButtons: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  shadow: {
    shadowColor: theme.colors.black, // IOS
    shadowOffset: { height: 0, width: 2 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: theme.sizes.avatar * 0.5, //IOS
    elevation: 10, // Android
    width: theme.sizes.avatar,
    height: theme.sizes.avatar,
    borderRadius: theme.sizes.avatar * 0.5,
    alignSelf: 'center'
  }
});

const TextPackage = localization[AppData.language];

const displayData = {
  email: TextPackage.EMAIL,
  role: TextPackage.ROLE,
  personal: {
    lastName: TextPackage.SURNAME,
    firstName: TextPackage.NAME,
    phone: TextPackage.PHONE
  }
};

const SettingsScreen = ({ navigation, userInfo, updateMe, showPopup, reduxSignOut }) => {
  const [avatarUpload] = useMutation(AVATAR_UPLOAD);
  const [signOut, { client }] = useMutation(SIGN_OUT);

  const handleAvatarSelect = () => {
    const options = {
      title: TextPackage.CHOSE_AVATAR,
      takePhotoButtonTitle: TextPackage.TAKE_PICTURE,
      chooseFromLibraryButtonTitle: TextPackage.CHOSE_PICTURE,
      cancelButtonTitle: TextPackage.CANCEL,
      permissionDenied: {
        title: TextPackage.PERMISSION_DENIED,
        text: TextPackage.PERMISSION_DENIED_MESSAGE,
        reTryTitle: TextPackage.RETRY,
        okTitle: TextPackage.CANCEL
      },
      noData: true,
      mediaType: 'photo'
    };

    ImagePicker.showImagePicker(options, async response => {
      if (response.didCancel) {
        return;
      }
      if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        if (response.error === "Permissions weren't granted") {
          //TODO: handle later in the future
        }
      } else {
        const file = new ReactNativeFile({
          uri: response.uri,
          type: response.type,
          name: response.fileName
        });
        await avatarUpload({ variables: { file } });
        updateMe({ avatar: response.uri });
      }
    });
  };

  const handleChangeInfo = () => {
    showPopup(AppConst.CHANGE_INFO_POPUP);
  };

  const handleChangePassword = () => {
    showPopup(AppConst.CHANGE_PASS_POPUP, { navigation });
  };

  const handleSignOut = () => {
    showPopup(AppConst.OK_CANCEL_POPUP, {
      title: TextPackage.SIGN_OUT,
      message: TextPackage.CONFIRM_SIGN_OUT_MESSAGE,
      confirmText: TextPackage.SURE,
      handleConfirm: async () => {
        await signOut();
        await client.resetStore();
        reduxSignOut();
        navigation.navigate('Auth');
      }
    });
  };

  return (
    <Block>
      <Block padding={[theme.sizes.base, theme.sizes.base * 2]}>
        <TouchableOpacity style={styles.shadow} onPress={handleAvatarSelect}>
          <Image key="avatar" style={styles.image} source={userInfo.avatar} />
        </TouchableOpacity>

        {Object.entries(displayData).map(([key, name]) => {
          if (typeof name === 'string') {
            return (
              <View key={key}>
                <Typography gray height={theme.sizes.body * 2}>
                  {name}
                </Typography>
                {key === 'email' && (
                  <Typography bold gray={!userInfo.email}>
                    {userInfo.email || TextPackage.UNKNOWN}
                  </Typography>
                )}
                {key === 'role' && (
                  <Typography bold gray={!userInfo.role}>
                    {TextPackage[userInfo.role] || TextPackage.UNKNOWN}
                  </Typography>
                )}
              </View>
            );
          }

          if (key === 'personal') {
            return (
              <View key={key}>
                <Divider />
                <Block flex={false} center row space="between">
                  <Typography bold title>
                    {TextPackage.PERSONAL_INFO}
                  </Typography>
                  <TouchableOpacity onPress={handleChangeInfo}>
                    <Typography bold primary>
                      {TextPackage.EDIT}
                    </Typography>
                  </TouchableOpacity>
                </Block>
                {Object.entries(name).map(([key, name]) => {
                  return (
                    <View key={key}>
                      <Typography gray height={theme.sizes.body * 2}>
                        {name}
                      </Typography>
                      <Typography bold gray={!userInfo[key]}>
                        {userInfo[key] || TextPackage.UNKNOWN}
                      </Typography>
                    </View>
                  );
                })}
              </View>
            );
          }

          return null;
        })}
      </Block>

      <Block padding={[theme.sizes.base, theme.sizes.base * 2]} style={styles.actionButtons}>
        <GradientButton shadow onPress={handleChangePassword}>
          <Typography bold center body>
            {TextPackage.CHANGE_PASSWORD}
          </Typography>
        </GradientButton>

        <GradientButton
          onPress={handleSignOut}
          gradient
          shadow
          startColor={theme.colors.redDark}
          endColor={theme.colors.redLight}
        >
          <Typography white bold center title>
            {TextPackage.SIGN_OUT}
          </Typography>
        </GradientButton>
      </Block>
    </Block>
  );
};

SettingsScreen.navigationOptions = {
  title: TextPackage.SETUP
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
  },
  reduxSignOut: () => {
    dispatch(meActions.signOut());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
