import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { GradientButton, Block, Typography } from 'src/components';
import { theme, localization } from 'src/constants';
import Popop from './Popup'

import AppData from 'src/AppData';
import AppConst from 'src/AppConst';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 50,
    marginBottom: 10,
    alignSelf: 'center'
  },
  scrollView: {
    width: '100%',
    paddingVertical: theme.sizes.base * 2,
  },
  scrollElement: {
    width: '100%',
  },
  divider_1px: {
    width: '100%',
    height: 1,
    backgroundColor: theme.colors.gray2
  },
  divider_5px: {
    width: '100%',
    height: 5,
    backgroundColor: theme.colors.gray2,
    marginTop: theme.sizes.padding
  },
  group_infor: {
    paddingBottom: theme.sizes.padding,
    paddingTop: theme.sizes.padding * 2,
    textTransform: 'capitalize',
    fontWeight: 'bold'
  },
  title_infor: {
    paddingTop: theme.sizes.padding,
    textTransform: 'capitalize',
    fontWeight: 'bold'
  },
  user_infor: {},
  change_infor: {
    textTransform: 'capitalize',
    color: theme.colors.green,
    textDecorationLine: 'underline',
    fontWeight: 'normal'
  }
});

const TextPackage = localization[AppData.language]

export default class SettingsScreen extends Component {
  static navigationOptions = {
    title: TextPackage.SETUP
  };

  state = {
    popupConfig: {
      type: AppConst.NO_POPUP,
    },
  };

  showPopup(type) {
    this.setState({ popupConfig: type });
  }

  closePopup() {
    this.setState({ popupConfig: { type: AppConst.NO_POPUP } });
  }

  confirmSignOut() {
    let config = {
      type: AppConst.YES_NO_POPUP,
      title: TextPackage.SIGN_OUT,
      message: TextPackage.CONFIRM_SIGN_OUT
    }
    this.setState({ popupConfig: config })
  }

  changePassword() {
    this.setState({ popupConfig: { type: AppConst.CHANGE_PASS_POPUP }})
  }

  changeInfor() {
    this.setState({ popupConfig: { type: AppConst.CHANGE_INFOR_POPUP }})
  }

  changeScope() {
    this.setState({ popupConfig: { type: AppConst.CHANGE_SCOPE_POPUP }})
  }

  render() {
    const { userProfile } = AppData
    return (
      <Block padding={[theme.sizes.base * 2, theme.sizes.base * 2]} style={styles.container}>
        <Popop popupConfig={this.state.popupConfig} closePopup={_ => { this.closePopup() }} />

        <Image
          style={styles.image}
          source={userProfile.avatar}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollElement}
          style={styles.scrollView}
        >
          <Typography style={styles.group_infor} >
            {TextPackage.GENERAL_INFOR}
          </Typography>
          <View style={styles.divider_1px} />
          <Typography style={styles.title_infor} >
            {TextPackage.EMAIL}
          </Typography>
          <Typography style={styles.user_infor} >
            {userProfile.email}
          </Typography>
          <Typography style={styles.title_infor} >
            {TextPackage.USER_SCOPE}
          </Typography>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography style={styles.user_infor} >
              {userProfile.scope}
            </Typography>
            <TouchableOpacity onPress={_ => { this.changeScope(); }}>
              <Typography style={[styles.user_infor, styles.change_infor]} >
                {TextPackage.EDIT}
              </Typography>
            </TouchableOpacity>
          </View>


          <View style={styles.divider_5px} />
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography style={styles.group_infor} >
              {TextPackage.PERSONAL_INFOR}
            </Typography>
            <TouchableOpacity onPress={_ => { this.changePassword(); }}>
              <Typography style={[styles.group_infor, styles.change_infor]} >
                {TextPackage.EDIT}
              </Typography>
            </TouchableOpacity>
          </View>
          <View style={styles.divider_1px} />
          <Typography style={styles.title_infor} >
            {TextPackage.SURNAME}
          </Typography>
          <Typography style={styles.user_infor} >
            {userProfile.surname}
          </Typography>
          <Typography style={styles.title_infor} >
            {TextPackage.NAME}
          </Typography>
          <Typography style={styles.user_infor} >
            {userProfile.name}
          </Typography>
          <Typography style={styles.title_infor} >
            {TextPackage.PHONE}
          </Typography>
          <Typography style={styles.user_infor} >
            {userProfile.phone}
          </Typography>
          <View style={styles.divider_5px} />
        </ScrollView>

        <GradientButton
          border
          style={{ width: '100%' }}
          onPress={_ => { this.changePassword() }}>
          <Typography black bold center>
            {TextPackage.CHANGE_PASSWORD}
          </Typography>
        </GradientButton>

        <GradientButton
          gradient
          style={{ width: '100%', }}
          onPress={_ => { this.confirmSignOut() }}>
          <Typography black bold center>
            {TextPackage.SIGN_OUT}
          </Typography>
        </GradientButton>
      </Block>
    )
  };
};