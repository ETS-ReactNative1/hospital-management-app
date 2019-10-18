import React, { Component, createRef } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Mutation } from 'react-apollo';
import { Header } from 'react-navigation-stack';
import validate from 'validate.js';

import styles from './SignInStyles';
import { GradientButton, Block, Input, Typography } from 'src/components';
import { theme } from 'src/constants';
import { SIGN_IN } from 'src/utils/graphqlMutations';
import AppData from 'src/AppData';

const schema = {
  email: {
    presence: { allowEmpty: false, message: '^Email là bắt buộc' },
    email: true,
    length: {
      maximum: 64,
      message: '^Độ dài tối đa là 64 ký tự'
    }
  },
  password: {
    presence: { allowEmpty: false, message: '^Mật khẩu là bắt buộc' },
    length: {
      minimum: 6,
      message: '^Độ dài tối thiểu là 6 ký tự'
    }
  }
};

export default class Login extends Component {
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
    this.passwordRef  = createRef();
    if (AppData.accessToken) {
      props.navigation.navigate('App');
    }
  }

  handleSignInCompleted = async data => {
    const { navigation } = this.props;

    AppData.accessToken = data.signIn.accessToken;
    navigation.navigate('App');
  };

  handleSignInError = error => {
    console.log(error.message);
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
    console.log('submitEditing');
    if (name === 'email') this.passwordRef.current.textInputRef.current.focus();
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
                    style={[styles.input, hasErrors('email') && styles.hasErrors]}
                    helperText={errors.email || ''}
                    placeholder="Email"
                    onChangeText={text => this.handleTextChange('email', text)}
                    onEndEditing={() => this.handleEndEditing('email')}
                    onSubmitEditing={() => this.handleSubmitEditing('email')}
                  />
                  <Input
                    name="password"
                    secure
                    placeholder="Mật khẩu"
                    error={hasErrors('password')}
                    style={[styles.input, hasErrors('password') && styles.hasErrors]}
                    helperText={errors.password || ''}
                    ref={this.passwordRef}
                    onChangeText={text => this.handleTextChange('password', text)}
                    onEndEditing={() => this.handleEndEditing('password')}
                    onSubmitEditing={() => this.handleSubmitEditing('password')}
                  />

                  <GradientButton
                    gradient
                    onPress={() => {
                      Keyboard.dismiss();
                      isValid && signIn();
                    }}
                    disabled={this.state.isValid}
                  >
                    {loading ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : (
                      <Typography bold white center>
                        Đăng nhập
                      </Typography>
                    )}
                  </GradientButton>

                  <GradientButton
                    style={styles.forgotPasswordStyle}
                    onPress={() => navigation.navigate('ForgotPassword')}
                  >
                    <Typography gray caption center style={{ textDecorationLine: 'underline' }}>
                      Quên mật khẩu?
                    </Typography>
                  </GradientButton>
                </Block>
              </KeyboardAvoidingView>
              <Block style={styles.bottomBlock}>
                <Typography black center style={styles.textStyle}>
                  {'Chưa có tài khoản?'}
                </Typography>

                <GradientButton border onPress={() => navigation.navigate('SignUp')}>
                  <Typography black bold center>
                    Đăng ký
                  </Typography>
                </GradientButton>
              </Block>
            </Block>
          );
        }}
      </Mutation>
    );
  }
}
