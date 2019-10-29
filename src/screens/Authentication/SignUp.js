import React, { Component, createRef } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Mutation } from 'react-apollo';

import { GradientButton, Block, Input, Typography } from 'src/components';
import { theme } from 'src/constants';
import { SIGN_UP } from 'src/utils/graphqlMutations';
import validate from 'src/utils/validateOverride';

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
  },
  confirmPassword: {
    presence: { allowEmpty: false, message: '^Xác nhận mật khẩu là bắt buộc' },
    equality: { attribute: 'password', message: '^Mật khẩu xác nhận không trùng khớp' }
  }
};

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
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.error
  },
  bottomBlock: {
    position: 'absolute',
    bottom: 32,
    width: '100%',
    alignSelf: 'center'
  }
});

export default class SignUp extends Component {
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
    console.log(error); // Need to test to define what to do with error
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
                <Block middle style={{ marginTop: 0 }}>
                  <Input
                    name="email"
                    placeholder="Email"
                    error={hasErrors('email')}
                    style={[styles.input, hasErrors('email') && styles.hasErrors]}
                    helperText={errors.email || ''}
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
                  <Input
                    name="confirmPassword"
                    secure
                    placeholder="Xác nhận mật khẩu"
                    error={hasErrors('confirmPassword')}
                    style={[styles.input, hasErrors('confirmPassword') && styles.hasErrors]}
                    helperText={errors.confirmPassword || ''}
                    ref={this.confirmPasswordRef}
                    onChangeText={text => this.handleTextChange('confirmPassword', text)}
                    onEndEditing={() => this.handleEndEditing('confirmPassword')}
                  />
                  <GradientButton
                    gradient
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
