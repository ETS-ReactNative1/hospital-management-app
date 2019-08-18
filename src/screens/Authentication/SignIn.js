import React, { Component } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Header } from 'react-navigation';
import { GradientButton, Block, Input, Typography } from '../../components';
import { theme } from '../../constants';

const VALID_EMAIL = 'long.nguyencong@bvquan11.com';
const VALID_PASSWORD = 'subscribe';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: VALID_EMAIL,
      password: VALID_PASSWORD,
      errors: [],
      loading: false
    };
  }

  handleLogin = async () => {
    const { navigation } = this.props;
    const { email, password } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    if (email !== VALID_EMAIL) {
      errors.push('email');
    }
    if (password !== VALID_PASSWORD) {
      errors.push('password');
    }

    this.setState({ errors, loading: false });

    if (!errors.length) {
      await AsyncStorage.setItem('userToken', 'somesupersecrettoken');
      navigation.navigate('App');
    }
  };

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);
    return (
      <Block padding={[0, theme.sizes.base * 2]}>
        <Typography h1 bold>
          Login
        </Typography>

        <KeyboardAvoidingView
          style={styles.login}
          behavior="padding"
          keyboardVerticalOffset={Header.HEIGHT}
        >
          <Block middle>
            <Input
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              secure
              label="Password"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />

            <GradientButton gradient onPress={() => this.handleLogin()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Typography bold white center>
                  Sign In
                </Typography>
              )}
            </GradientButton>

            <GradientButton
              style={styles.forgotPasswordStyle}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Typography gray caption center style={{ textDecorationLine: 'underline' }}>
                Forgot your password?
              </Typography>
            </GradientButton>
          </Block>
        </KeyboardAvoidingView>
        <Block style={styles.bottomBlock}>
          <Typography black center style={styles.textStyle}>
            {"Don't have an account?"}
          </Typography>

          <GradientButton border onPress={() => navigation.navigate('SignUp')}>
            <Typography black bold center>
              Sign Up
            </Typography>
          </GradientButton>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  },
  forgotPasswordStyle: {
    height: 24
  },
  textStyle: {
    marginTop: 48
  },
  bottomBlock: { position: 'absolute', bottom: 32, width: '100%', alignSelf: 'center' }
});
