import React, { Component, createRef } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Mutation } from 'react-apollo';

import { GradientButton, Block, Input, Typography } from 'src/components';
import { theme, localization, generalStyles } from 'src/constants';
import { SIGN_UP } from 'src/utils/graphqlMutations';
import { popupActions } from 'src/redux/actions';
import { connect } from 'react-redux';
import validate from 'src/utils/validateOverride';
import AppData from 'src/AppData';
import AppConst from 'src/AppConst';

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
  },
  confirmPassword: {
    presence: { allowEmpty: false, message: TextPackage.CONFRIM_PASSWORD_REQUIRED_ERROR },
    equality: { attribute: 'password', message: TextPackage.CONFRIM_PASSWORD_CONFLICT_ERROR }
  }
};

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 56
  },
  bottomBlock: {
    position: 'absolute',
    bottom: 32,
    width: '100%',
    alignSelf: 'center'
  }
});

class SignUp extends Component {
  static navigationOptions = {
    title: 'Đăng ký'
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
    this.confirmPasswordRef = createRef();
  }

  handleSignUpCompleted = async () => {
    const { navigation } = this.props;

    Alert.alert(
      'Thành công!',
      'Tài khoản của bạn đã được tạo. Hãy kiểm tra email để kích hoạt!',
      [
        {
          text: 'Tiếp tục',
          onPress: () => {
            navigation.navigate('SignIn');
          }
        }
      ],
      { cancelable: false }
    );
  };

  handleSignUpError = error => {
    this.props.showPopup(AppConst.ERROR_POPUP, {
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
        const { values, touched } = this.state;
        const errors = validate(values, schema);
        this.setState({
          isValid: !errors,
          errors: errors || {}
        });

        if (
          !touched.confirmPassword &&
          values.confirmPassword &&
          values.password.length === values.confirmPassword.length
        ) {
          this.setState({
            touched: {
              ...touched,
              confirmPassword: true
            }
          });
        }
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
    if (name === 'password') this.confirmPasswordRef.current.textInputRef.current.focus();
  };

  render() {
    const {
      touched,
      errors,
      isValid,
      values: { email, password }
    } = this.state;

    const hasErrors = key => touched[key] && errors[key];

    return (
      <Mutation
        mutation={SIGN_UP}
        variables={{ email, password }}
        onCompleted={this.handleSignUpCompleted}
        onError={error => this.handleSignUpError(error)}
      >
        {(signUp, { loading }) => {
          return (
            <Block padding={[0, theme.sizes.base * 2]}>
              <KeyboardAvoidingView style={styles.signup} behavior="padding">
                <Block middle>
                  <Input
                    name="email"
                    label="Email"
                    error={hasErrors('email')}
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
                  <Input
                    name="confirmPassword"
                    secure
                    label="Xác nhận mật khẩu"
                    error={hasErrors('confirmPassword')}
                    style={[generalStyles.input, hasErrors('confirmPassword') && styles.hasErrors]}
                    helperText={errors.confirmPassword || ''}
                    ref={this.confirmPasswordRef}
                    onChangeText={text => this.handleTextChange('confirmPassword', text)}
                    onEndEditing={() => this.handleEndEditing('confirmPassword')}
                  />
                  <GradientButton
                    gradient
                    disabled={!isValid}
                    onPress={() => {
                      Keyboard.dismiss();
                      isValid && signUp();
                    }}
                  >
                    {loading ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : (
                      <Typography bold white center>
                        Đăng ký
                      </Typography>
                    )}
                  </GradientButton>
                </Block>
              </KeyboardAvoidingView>
            </Block>
          );
        }}
      </Mutation>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  showPopup: (popupType, popupProps) => {
    dispatch(popupActions.showPopup(popupType, popupProps));
  },
  hidePopup: () => {
    dispatch(popupActions.hidePopup());
  },
});

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
