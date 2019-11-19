import React, { Component, createRef } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Mutation } from 'react-apollo';

import { GradientButton, Block, Input, Typography } from 'src/components';
import { theme, localization, generalStyles } from 'src/constants';
import { SIGN_UP } from 'src/utils/graphqlMutations';
import validate from 'src/utils/validateOverride';
import AppData from 'src/AppData';
import AppConst from 'src/AppConst';
import graphqlErrorHandler from 'src/utils/graphqlErrorHandler';
import { connect } from 'react-redux';
import { popupActions } from 'src/redux/actions';

const TextPackage = localization[AppData.language];

const schema = {
  email: {
    presence: { allowEmpty: false, message: TextPackage.EMAIL_REQUIRED_ERROR },
    email: true,
    exclusion: { within: [], message: `^${TextPackage.EMAIL_IS_TAKEN_ERR}` },
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
    title: TextPackage.SIGN_UP
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
    const { navigation, showPopup } = this.props;

    showPopup(AppConst.OK_POPUP, {
      title: TextPackage.SIGN_UP_SUCCESS,
      message: TextPackage.SIGN_UP_SUCCESS_MESSAGE,
      confirmText: TextPackage.CONTINUE,
      handleConfirm: () => {
        navigation.goBack();
      }
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

  handleSignUpError = error => {
    graphqlErrorHandler(error);
    if (error.graphQLErrors[0].message.indexOf('Email is already taken') !== -1) {
      const { values } = this.state;
      schema.email.exclusion.within.push(values.email);
      const errors = validate(values, schema);
      this.setState({
        isValid: !errors,
        errors
      });
    }
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
                    label={TextPackage.EMAIL}
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
                    label={TextPackage.PASSWORD}
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
                    label={TextPackage.CONFIRM_PASSWORD}
                    error={hasErrors('confirmPassword')}
                    style={[generalStyles.input, hasErrors('confirmPassword') && styles.hasErrors]}
                    helperText={errors.confirmPassword || ''}
                    ref={this.confirmPasswordRef}
                    onChangeText={text => this.handleTextChange('confirmPassword', text)}
                    onEndEditing={() => this.handleEndEditing('confirmPassword')}
                  />
                  <GradientButton
                    gradient
                    shadow
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
  }
});

export default connect(null, mapDispatchToProps)(SignUp);
