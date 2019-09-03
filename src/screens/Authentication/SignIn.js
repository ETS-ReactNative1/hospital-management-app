import React, { Component } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Mutation } from 'react-apollo';
import { Header } from 'react-navigation-stack';

import { GradientButton, Block, Input, Typography } from '../../components';
import { theme } from '../../constants';
import { SIGN_IN } from '../../utils/graphqlQuery';

// const VALID_EMAIL = 'long.nguyencong@bvquan11.com';
// const VALID_PASSWORD = 'subscribe';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      errors: []
    };
  }

  handleSignIn = async data => {
    const { navigation } = this.props;
    const { email, password } = this.state;
    const errors = [];

    // check with backend API or with some static data
    if (!email) errors.push('email');
    if (!password) errors.push('password');

    this.setState({ errors });

    if (!errors.length && data && data.signIn) {
      await AsyncStorage.setItem('userToken', data.signIn.token);
      navigation.navigate('App');
    }
  };

  handleSignInError = error => {
    const errors = [];
    if (error) {
      console.log(error); // Need to test to define what to do with error
      errors.push(error);
    }

    this.setState({ errors });
  };

  render() {
    const { navigation } = this.props;
    const { errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);
    const { email, password } = this.state;
    return (
      <Mutation
        mutation={SIGN_IN}
        variables={{ email, password }}
        onCompleted={data => this.handleSignIn(data)}
        onError={error => this.handleSignInError(error)}
      >
        {(signIn, { loading }) => {
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

                  <GradientButton
                    gradient
                    onPress={() => {
                      Keyboard.dismiss();
                      signIn();
                    }}
                  >
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
        }}
      </Mutation>
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
