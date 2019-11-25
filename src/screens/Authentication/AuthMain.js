import React, { useEffect } from 'react';
import { StyleSheet, Image, BackHandler } from 'react-native';

import { GradientButton, Block, Typography } from 'src/components';
import { theme, localization } from 'src/constants';
import AppConst from 'src/AppConst';
import AppData from 'src/AppData';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { popupActions } from 'src/redux/actions';

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

const TextPackage = localization[AppData.language];

const AuthMain = ({ navigation, accessToken, showPopup }) => {
  if (accessToken) {
    navigation.navigate('App');
  }

  const handleBackButtonPressAndroid = () => {
    if (navigation.isFocused()) {
      showPopup(AppConst.OK_CANCEL_POPUP, {
        title: TextPackage.EXIT_CONFIRM,
        message: TextPackage.EXIT_CONFIRM_MESSAGE,
        handleConfirm: () => {
          BackHandler.exitApp();
        }
      });
      return true;
    }
    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonPressAndroid);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPressAndroid);
    };
  }, []);

  return (
    <Block center padding={[0, theme.sizes.base * 2]}>
      <Typography black uppercase style={styles.title}>
        {TextPackage.MANAGE}
      </Typography>

      <Typography primary uppercase style={styles.title}>
        {TextPackage.HOSPITAL_EQUIPMENT}
      </Typography>

      <Typography gray>{TextPackage.OPERATE_MORE_EFFICIENT}</Typography>

      <Image style={styles.image} source={require('src/assets/images/auth.jpg')} />

      <GradientButton
        style={styles.actionButton}
        shadow
        gradient
        onPress={() => navigation.navigate('SignIn')}
      >
        <Typography white body bold center>
          {TextPackage.SIGN_IN}
        </Typography>
      </GradientButton>

      <GradientButton
        style={styles.actionButton}
        shadow
        onPress={() => navigation.navigate('SignUp')}
      >
        <Typography bold body center>
          {TextPackage.SIGN_UP}
        </Typography>
      </GradientButton>

      <TouchableOpacity style={styles.termCondition}>
        <Typography gray center>
          {TextPackage.TERMS_OF_SERVICE}
        </Typography>
      </TouchableOpacity>
    </Block>
  );
};

const mapStateToProps = state => state.me;

const mapDispatchToProps = dispatch => ({
  showPopup: (popupType, popupProps) => {
    dispatch(popupActions.showPopup(popupType, popupProps));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthMain);
