import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';

import { GradientButton, Block, Typography } from 'src/components';
import { theme } from 'src/constants';
import AppData from 'src/AppData';

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'SFUIText'
  },
  image: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain'
  }
});

export default class AuthMain extends Component {
  constructor(props) {
    super(props);
    if (AppData.accessToken) {
      props.navigation.navigate('App');
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <Block>
        <Block center padding={[0, theme.sizes.base * 2]}>
          <Typography color={theme.colors.black} style={styles.title}>
            QUẢN LÝ
          </Typography>

          <Typography color={theme.colors.green} style={styles.title}>
            THIẾT BỊ BỆNH VIỆN
          </Typography>

          <Typography gray>Vận Hành Hiệu Quả Hơn</Typography>

          <Image style={styles.image} source={require('src/assets/images/auth.jpg')} />

          <GradientButton
            gradient
            style={{ width: '100%' }}
            onPress={() => navigation.navigate('SignIn')}
          >
            <Typography black bold center>
              Đăng nhập
            </Typography>
          </GradientButton>

          <GradientButton
            border
            style={{ width: '100%' }}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Typography black bold center>
              Đăng ký
            </Typography>
          </GradientButton>
        </Block>
      </Block>
    );
  }
}
