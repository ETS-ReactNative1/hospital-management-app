import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';

import { GradientButton, Block, Input, Typography } from '../../components';
import { theme } from '../../constants';

export default class SignUp extends Component {
  state = {
    email: null,
    username: null,
    password: null,
    passwordConfirm: null,
    errors: [],
    loading: false
  };

  handleSignUp() {
    const { navigation } = this.props;
    const { email, username, password } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    if (!email) errors.push('email');
    if (!username) errors.push('username');
    if (!password) errors.push('password');

    this.setState({ errors, loading: false });

    if (!errors.length) {
      Alert.alert(
        'Success!',
        'Your account has been created',
        [
          {
            text: 'Continue',
            onPress: () => {
              navigation.navigate('Browse');
            }
          }
        ],
        { cancelable: false }
      );
    }
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <Block padding={[0, theme.sizes.base * 2]}>
        <Typography h1 bold>
          Sign Up
        </Typography>
        <KeyboardAvoidingView style={styles.signup} behavior="padding">
          <Block middle style={{ marginTop: 0 }}>
            <Input
              email
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
            <Input
              secure
              label="Confirm Password"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              defaultValue={this.state.passwordConfirm}
              onChangeText={text => this.setState({ passwordConfirm: text })}
            />
            <GradientButton gradient onPress={() => this.handleSignUp()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Typography bold white center>
                  Sign Up
                </Typography>
              )}
            </GradientButton>
          </Block>
        </KeyboardAvoidingView>

        <Block middle style={styles.bottomBlock}>
          <Typography black center style={styles.textStyle}>
            {'Already have an account?'}
          </Typography>

          <GradientButton border onPress={() => navigation.navigate('SignIn')}>
            <Typography black bold center>
              Sign In
            </Typography>
          </GradientButton>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 56
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 0
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  },
  bottomBlock: {
    position: 'absolute',
    bottom: 32,
    width: '100%',
    alignSelf: 'center'
  }
});
