import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { useQuery } from 'react-apollo';
import { ME } from 'src/utils/graphqlQueries';

import { GradientButton, Block, Typography } from 'src/components';
import { theme } from 'src/constants';
import AppData from 'src/AppData';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  image: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
    marginVertical: theme.sizes.base
  },
  actionButton: {
    width: '100%'
  },
  termCondition: {
    marginVertical: theme.sizes.padding
  }
});

const AuthMain = props => {
  const { navigation } = props;

  if (AppData.accessToken) {
    navigation.navigate('App');
  }

  return (
    <Block center padding={[0, theme.sizes.base * 2]}>
      <Typography color={theme.colors.black} style={styles.title}>
        QUẢN LÝ
      </Typography>

      <Typography color={theme.colors.green} style={styles.title}>
        THIẾT BỊ BỆNH VIỆN
      </Typography>

      <Typography gray>Vận hành hiệu quả hơn</Typography>

      <Image style={styles.image} source={require('src/assets/images/auth.jpg')} />

      <GradientButton
        style={styles.actionButton}
        shadow
        gradient
        onPress={() => navigation.navigate('SignIn')}
      >
        <Typography white body bold center>
          Đăng nhập
        </Typography>
      </GradientButton>

      <GradientButton
        style={styles.actionButton}
        shadow
        onPress={() => navigation.navigate('SignUp')}
      >
        <Typography bold body center>
          Đăng ký
        </Typography>
      </GradientButton>

      <TouchableOpacity style={styles.termCondition}>
        <Typography gray center>
          Điều khoản dịch vụ
        </Typography>
      </TouchableOpacity>
    </Block>
  );
};

export default AuthMain;
