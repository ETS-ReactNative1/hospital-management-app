import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image, View, Modal, TouchableOpacity } from 'react-native';
import { GradientButton, Block, Typography } from 'src/components';
import Popop from './Popup'

import { useMutation } from 'react-apollo';
import { SIGN_OUT } from 'src/utils/graphqlMutations';

import AppData from 'src/AppData';
import { theme, mocks } from 'src/constants';

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

export default class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Cài đặt'
  };

  state = {
    popupType: -1,
  };

  setPopupType(type) {
    this.setState({ popupType: type });
  }

  closePopup()
  {
    this.setState({ popupType: -1 });
  }

  render() {
    const { userProfile } = AppData
    return (
      <Block padding={[theme.sizes.base * 2, theme.sizes.base * 2]} style={styles.container}>
        <Popop popupType={this.state.popupType} closePopup={_ => {this.closePopup()}}/>

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
            Thông tin chung
          </Typography>
          <View style={styles.divider_1px} />
          <Typography style={styles.title_infor} >
            Email
          </Typography>
          <Typography style={styles.user_infor} >
            {userProfile.email}
          </Typography>
          <Typography style={styles.title_infor} >
            Vai trò
            </Typography>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography style={styles.user_infor} >
              {userProfile.scope}
            </Typography>
            <TouchableOpacity onPress={_ => { this.setPopupType(1); }}>
              <Typography style={[styles.user_infor, styles.change_infor]} >
                Chỉnh sửa
              </Typography>
            </TouchableOpacity>
          </View>


          <View style={styles.divider_5px} />
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography style={styles.group_infor} >
              Thông tin cá nhân
            </Typography>
            <TouchableOpacity onPress={_ => { this.setPopupType(1); }}>
              <Typography style={[styles.group_infor, styles.change_infor]} >
                Chỉnh sửa
              </Typography>
            </TouchableOpacity>
          </View>
          <View style={styles.divider_1px} />
          <Typography style={styles.title_infor} >
            Họ và tên đệm
          </Typography>
          <Typography style={styles.user_infor} >
            {userProfile.surname}
          </Typography>
          <Typography style={styles.title_infor} >
            Tên
          </Typography>
          <Typography style={styles.user_infor} >
            {userProfile.name}
          </Typography>
          <Typography style={styles.title_infor} >
            Số điện thoại
          </Typography>
          <Typography style={styles.user_infor} >
            {userProfile.phone}
          </Typography>
          <View style={styles.divider_5px} />
        </ScrollView>

        <GradientButton
          border
          style={{ width: '100%' }}
          onPress={_ => { this.setPopupType(1); }}>
          <Typography black bold center>
            Đổi mật khẩu
          </Typography>
        </GradientButton>

        <GradientButton
          gradient
          style={{ width: '100%', }}
          onPress={_ => { this.setPopupType(1); }}>
          <Typography black bold center>
            Đăng xuất
          </Typography>
        </GradientButton>
      </Block>
    )
  };
};