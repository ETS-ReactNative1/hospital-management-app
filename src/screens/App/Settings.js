import React from 'react';
import { ScrollView, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { GradientButton, Block, Typography } from 'src/components';
import { theme, localization, generalStyles } from 'src/constants';
import AppData from 'src/AppData';
import AppConst from 'src/AppConst';
import { useMutation } from 'react-apollo';
import { SIGN_OUT } from 'src/utils/graphqlMutations';
import { actions } from 'src/utils/reduxStore';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  scrollView: {
    width: '100%',
    paddingVertical: theme.sizes.base * 2
  },
  scrollElement: {
    width: '100%'
  },
  edite_infor: {
    textTransform: 'capitalize',
    color: theme.colors.green,
    textDecorationLine: 'underline',
    fontWeight: 'normal'
  }
});

const TextPackage = localization[AppData.language];

const SettingsScreen = props => {
  const [signOut, { client }] = useMutation(SIGN_OUT);
  const { navigation, showPopup, hidePopup } = props;
  const { userProfile } = AppData;

  const handleSignOut = async () => {
    await signOut();
    await client.resetStore();
    AppData.accessToken = undefined;
    navigation.navigate('Auth');
    hidePopup();
  };

  const confirmSignOut = () => {
    showPopup({
      type: AppConst.OK_CANCEL_POPUP,
      title: TextPackage.SIGN_OUT,
      message: TextPackage.CONFIRM_SIGN_OUT,
      okText: TextPackage.SURE,
      okFunc: handleSignOut
    });
  };

  const forceSignOut = () => {
    showPopup({
      type: AppConst.OK_POPUP,
      title: TextPackage.CHANGE_SUCCESSFULL,
      message: TextPackage.CHANGE_PASSWORD_SUCCESSFULL,
      okText: TextPackage.CONTINUE,
      okFunc: handleSignOut,
      closeByBackBtn: false
    });
  };

  const changePassword = () => {
    showPopup({
      type: AppConst.CHANGE_PASS_POPUP,
      callback: forceSignOut
    });
  };

  const changeInforSuccess = () => {
    showPopup({
      type: AppConst.OK_POPUP,
      title: TextPackage.CHANGE_INFOR_SUCCESSFULL_TITLE,
      message: TextPackage.CHANGE_INFOR_SUCCESSFULL_MESSAGE,
      okText: TextPackage.CONTINUE
    });
  };

  const changeInfor = () => {
    showPopup({
      type: AppConst.CHANGE_INFOR_POPUP,
      callback: changeInforSuccess
    });
  };

  // const changeScope = () => {
  //   showPopup({
  //     type: AppConst.CHANGE_SCOPE_POPUP
  //   });
  // };

  return (
    <Block style={generalStyles.screen_container}>
      <Image style={styles.image} source={userProfile.avatar} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollElement}
        style={styles.scrollView}
      >
        <Typography style={generalStyles.title_infor}>{TextPackage.GENERAL_INFOR}</Typography>
        <View style={generalStyles.divider_1px} />
        <Typography style={generalStyles.title_infor}>{TextPackage.EMAIL}</Typography>
        <Typography>{userProfile.email}</Typography>
        <Typography style={generalStyles.title_infor}>{TextPackage.USER_SCOPE}</Typography>
        <Typography>{userProfile.scope}</Typography>
        {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography>{userProfile.scope}</Typography>
          <TouchableOpacity>
            <Typography style={styles.edite_infor}>{TextPackage.EDIT}</Typography>
          </TouchableOpacity>
        </View> */}

        <View style={generalStyles.divider_5px} />
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography style={generalStyles.title_infor}>{TextPackage.PERSONAL_INFOR}</Typography>
          <TouchableOpacity onPress={changeInfor}>
            <Typography style={[generalStyles.title_infor, styles.edite_infor]}>
              {TextPackage.EDIT}
            </Typography>
          </TouchableOpacity>
        </View>
        <View style={generalStyles.divider_1px} />
        <Typography style={generalStyles.title_infor}>{TextPackage.SURNAME}</Typography>
        <Typography>{userProfile.surname}</Typography>
        <Typography style={generalStyles.title_infor}>{TextPackage.NAME}</Typography>
        <Typography>{userProfile.name}</Typography>
        <Typography style={generalStyles.title_infor}>{TextPackage.PHONE}</Typography>
        <Typography>{userProfile.phone}</Typography>
        <View style={generalStyles.divider_5px} />
      </ScrollView>

      <GradientButton border style={{ width: '100%' }} onPress={changePassword}>
        <Typography black bold center>
          {TextPackage.CHANGE_PASSWORD}
        </Typography>
      </GradientButton>

      <GradientButton gradient style={{ width: '100%' }} onPress={confirmSignOut}>
        <Typography black bold center>
          {TextPackage.SIGN_OUT}
        </Typography>
      </GradientButton>
    </Block>
  );
};

SettingsScreen.navigationOptions = {
  title: TextPackage.SETUP
};

export default connect(
  ({ popup }) => ({ popup }),
  actions
)(SettingsScreen);
