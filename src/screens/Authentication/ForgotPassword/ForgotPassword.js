import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Mutation } from 'react-apollo';

import styles from './ForgotPasswordStyles';
import { GradientButton, Block, Input, Typography } from 'src/components';
import { theme } from 'src/constants';
import { FORGOT_PASSWORD } from 'src/utils/graphqlMutations';
import validate from 'src/utils/validateOverride';

const schema = {
  email: {
    presence: { allowEmpty: false, message: '^Email là bắt buộc' },
    email: true,
    length: {
      maximum: 64,
      message: '^Độ dài tối đa là 64 ký tự'
    }
  }
};

export default class Forgot extends Component {
  static navigationOptions = {
    title: 'Quên mật khẩu'
  };

  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      values: {},
      touched: {},
      errors: {}
    };
  }

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

  handleForgotError = error => {
    console.log(error);
    Alert.alert('Lỗi', 'Hãy kiểm tra lại địa chỉ email của bạn.', [{ text: 'Thử lại' }], {
      cancelable: false
    });
  };

  handleForgotCompleted() {
    const { navigation } = this.props;
    console.log(navigation);
    const { isValid } = this.state;

    if (isValid) {
      Alert.alert(
        'Thành công!',
        'Hãy kiểm tra email để lấy lại mật khẩu',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('SignIn');
            }
          }
        ],
        { cancelable: false }
      );
    }
  }

  render() {
    const {
      touched,
      isValid,
      errors,
      values: { email }
    } = this.state;
    const hasErrors = key => touched[key] && errors[key];

    return (
      <Mutation
        mutation={FORGOT_PASSWORD}
        variables={{ email }}
        onCompleted={() => this.handleForgotCompleted()}
        onError={error => this.handleForgotError(error)}
      >
        {(forgotPassword, { loading }) => {
          return (
            <Block padding={[0, theme.sizes.base * 2]}>
              <KeyboardAvoidingView style={styles.forgot} behavior="padding">
                <Block middle>
                  <Input
                    name="email"
                    placeholder="Email"
                    error={hasErrors('email')}
                    style={[styles.input, hasErrors('email') && styles.hasErrors]}
                    helperText={errors.email || ''}
                    onChangeText={text => this.handleTextChange('email', text)}
                    onEndEditing={() => this.handleEndEditing('email')}
                  />
                  <GradientButton
                    gradient
                    onPress={() => {
                      Keyboard.dismiss();
                      isValid && forgotPassword();
                    }}
                  >
                    {loading ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : (
                      <Typography bold white center>
                        Xác nhận
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
