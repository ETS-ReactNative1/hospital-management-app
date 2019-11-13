import React, { Component, createRef } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Mutation } from 'react-apollo';
import { Header } from 'react-navigation-stack';
import { connect } from 'react-redux';

import { GradientButton, Block, Input, Typography } from 'src/components';
import { theme, localization, generalStyles } from 'src/constants';
import { SIGN_IN } from 'src/utils/graphqlMutations';
import { actions } from 'src/utils/reduxStore';
import { connect } from 'react-redux';
import validate from 'src/utils/validateOverride';
import { TouchableOpacity } from 'react-native-gesture-handler';
import meQuery from 'src/utils/meQuery';
import { meActions } from 'src/redux/actions';

const TextPackage = localization[AppData.language];

const schema = {
  email: {
    presence: { allowEmpty: false, message: TextPackage.EMAIL_REQUIRED_ERROR },
    email: true,
    length: {
      maximum: 64,
      message: TextPackage.EMAIL_TOO_LONG_ERROR
    }
  },
  password: {
    presence: { allowEmpty: false, message: TextPackage.PASSWORD_REQUIRED_ERROR },
    length: {
      minimum: 6,
      message: TextPackage.PASSWORD_TOO_SHORT_ERROR
    }
  }
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center'
  },
  forgotPasswordStyle: {
    marginTop: theme.sizes.padding
  },
  textStyle: {
    marginTop: 48
  },
  bottomBlock: { position: 'absolute', bottom: 32, width: '100%', alignSelf: 'center' }
});

class SignIn extends Component {
  static navigationOptions = {
    title: 'Đăng nhập'
  };

  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      values: {},
      touched: {},
      errors: {}
    };
    this.passwordRef = createRef();
    if (AppData.accessToken) {
      props.navigation.navigate('App');
    }
  }

  handleSignInCompleted = async data => {
    const { navigation } = this.props;

    AppData.accessToken = data.signIn.accessToken;
    const me = await meQuery();
    this.props.updateMe(me);
    navigation.navigate('App');
  };

  handleSignInError = error => {
    this.props.showPopup({
      type: AppConst.ERROR_POPUP,
      errorMsg: error.message
    });
  };

  handleTextChange = (name, text) => {
    const { values } = this.state;

    this.setState(
      {
        values: {
          ...values,
          [name]: text
        }
      },
      () => {
        const { values } = this.state;
        const errors = validate(values, schema);
        this.setState({
          isValid: !errors,
          errors: errors || {}
        });
      }
    );
  };

  handleEndEditing = name => {
    const { touched } = this.state;

    this.setState({
      touched: {
        ...touched,
        [name]: true
      }
    });
  };

  handleSubmitEditing = name => {
    if (name === 'email') this.passwordRef.current.textInputRef.current.focus();
  };

  static navigationOptions = {
    title: 'Đăng nhập'
  };

  render() {
    const { navigation } = this.props;
    const {
      touched,
      errors,
      isValid,
      values: { email, password }
    } = this.state;
    const hasErrors = key => touched[key] && errors[key];
    return (
      <Mutation
        mutation={SIGN_IN}
        variables={{ email, password }}
        onCompleted={data => this.handleSignInCompleted(data)}
        onError={error => this.handleSignInError(error)}
      >
        {(signIn, { loading }) => {
          return (
            <Block padding={[0, theme.sizes.base * 2]}>
              <KeyboardAvoidingView
                style={styles.login}
                behavior="padding"
                keyboardVerticalOffset={Header.HEIGHT}
              >
                <Block middle>
                  <Input
                    name="email"
                    error={hasErrors('email')}
                    label="Email"
                    style={[generalStyles.input, hasErrors('email') && generalStyles.hasErrors]}
                    helperText={errors.email || ''}
                    onChangeText={text => this.handleTextChange('email', text)}
                    onEndEditing={() => this.handleEndEditing('email')}
                    onSubmitEditing={() => this.handleSubmitEditing('email')}
                  />
                  <Input
                    name="password"
                    secure
                    label="Mật khẩu"
                    error={hasErrors('password')}
                    style={[generalStyles.input, hasErrors('password') && generalStyles.hasErrors]}
                    helperText={errors.password || ''}
                    ref={this.passwordRef}
                    onChangeText={text => this.handleTextChange('password', text)}
                    onEndEditing={() => this.handleEndEditing('password')}
                    onSubmitEditing={() => this.handleSubmitEditing('password')}
                  />

                  <GradientButton
                    shadow
                    gradient
                    onPress={() => {
                      Keyboard.dismiss();
                      isValid && signIn();
                    }}
                    disabled={!isValid}
                  >
                    {loading ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : (
                      <Typography bold white center>
                        Đăng nhập
                      </Typography>
                    )}
                  </GradientButton>

                  <TouchableOpacity
                    style={styles.forgotPasswordStyle}
                    onPress={() => navigation.navigate('ForgotPassword')}
                  >
                    <Typography gray caption center underline>
                      Quên mật khẩu?
                    </Typography>
                  </TouchableOpacity>
                </Block>
              </KeyboardAvoidingView>
              {/* <Block style={styles.bottomBlock}>
                <Typography black center style={styles.textStyle}>
                  {'Chưa có tài khoản?'}
                </Typography>

                <GradientButton shadow border onPress={() => navigation.navigate('SignUp')}>
                  <Typography black bold center>
                    Đăng ký
                  </Typography>
                </GradientButton>
              </Block> */}
            </Block>
          );
        }}
      </Mutation>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  // showPopup: (popupType, popupProps) => {
  //   dispatch(popupActions.showPopup(popupType, popupProps));
  // },
  // hidePopup: () => {
  //   dispatch(popupActions.hidePopup());
  // },
  updateMe: me => {
    dispatch(meActions.updateMe(me));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
