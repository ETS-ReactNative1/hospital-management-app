import React, { Component } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Mutation } from 'react-apollo';

import { GradientButton, Block, Input, Typography } from 'src/components';
import { theme, localization, generalStyles } from 'src/constants';
import { FORGOT_PASSWORD } from 'src/utils/graphqlMutations';
import validate from 'src/utils/validateOverride';
import AppData from 'src/AppData';
import AppConst from 'src/AppConst';
import graphqlErrorHandler from 'src/utils/graphqlErrorHandler';
import { popupActions } from 'src/redux/actions';
import { connect } from 'react-redux';

const TextPackage = localization[AppData.language];

const schema = {
  email: {
    presence: { allowEmpty: false, message: TextPackage.EMAIL_REQUIRED_ERROR },
    email: true,
    exclusion: { within: [], message: `^${TextPackage.EMAIL_NOT_EXIST_ERR}` },
    length: {
      maximum: 64,
      message: TextPackage.EMAIL_TOO_LONG_ERROR
    }
  }
};

const styles = StyleSheet.create({
  forgot: {
    flex: 1,
    justifyContent: 'center'
  }
});

class Forgot extends Component {
  static navigationOptions = {
    title: TextPackage.FORGOT_PASSWORD
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
    graphqlErrorHandler(error);
    if (error.graphQLErrors[0].message.indexOf('No user exist') !== -1) {
      const { values } = this.state;
      schema.email.exclusion.within.push(values.email);
      const errors = validate(values, schema);
      this.setState({
        isValid: !errors,
        errors
      });
    }
  };

  handleForgotCompleted() {
    const { navigation, showPopup } = this.props;

    showPopup(AppConst.OK_CANCEL_POPUP, {
      title: TextPackage.SUCCESS,
      message: TextPackage.FORGOT_PASSWORD_SUCCESS_MESSAGE,
      confirmText: TextPackage.CONTINUE,
      handleConfirm: () => {
        navigation.goBack();
      }
    });
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
                    label={TextPackage.EMAIL}
                    error={hasErrors('email')}
                    style={[generalStyles.input, hasErrors('email') && generalStyles.hasErrors]}
                    helperText={errors.email || ''}
                    onChangeText={text => this.handleTextChange('email', text)}
                    onEndEditing={() => this.handleEndEditing('email')}
                  />
                  <GradientButton
                    gradient
                    shadow
                    disabled={!isValid}
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

const mapDispatchToProps = dispatch => ({
  showPopup: (popupType, popupProps) => {
    dispatch(popupActions.showPopup(popupType, popupProps));
  }
});

export default connect(null, mapDispatchToProps)(Forgot);
