import React, { Component, createRef } from 'react';
import { Input } from 'src/components';
import { View, TouchableOpacity, Keyboard, Text, StyleSheet } from 'react-native';
import { localization, generalStyles, theme } from 'src/constants';
import { CHANGE_PASSWORD } from 'src/utils/graphqlMutations';
import { Mutation } from 'react-apollo';
import { actions } from 'src/utils/reduxStore';
import { connect } from 'react-redux';
import validate from 'src/utils/validateOverride';
import AppData from 'src/AppData';
import AppConst from 'src/AppConst';

const TextPackage = localization[AppData.language];

const schema = {
  password: {
    presence: { allowEmpty: false, message: TextPackage.PASSWORD_REQUIRED_ERROR },
    length: {
      minimum: 6,
      message: TextPackage.PASSWORD_TOO_SHORT_ERROR
    }
  },
  oldPassword: {
    presence: { allowEmpty: false, message: TextPackage.PASSWORD_REQUIRED_ERROR },
    length: {
      minimum: 6,
      message: TextPackage.PASSWORD_TOO_SHORT_ERROR
    }
  },
  confirmPassword: {
    presence: { allowEmpty: false, message: TextPackage.CONFRIM_PASSWORD_REQUIRED_ERROR },
    equality: { attribute: 'password', message: TextPackage.CONFRIM_PASSWORD_CONFLIT_ERROR }
  }
};

const styles = StyleSheet.create({
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

class ChangePassPopup extends Component {
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

  handleChangePasswordCompleted = () => {
    this.props.hidePopup();
    this.props.popup.callback();
  };

  handleChangePasswordError = error => {
    console.log(error);
    // this.props.hidePopup();
    // this.props.popup.callback();
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

  render() {
    const { popup, hidePopup } = this.props;
    const {
      isValid,
      touched,
      errors,
      values: { password }
    } = this.state;
    const hasErrors = key => touched[key] && errors[key];
    if (popup.type === AppConst.CHANGE_PASS_POPUP)
      return (
        <Mutation
          mutation={CHANGE_PASSWORD}
          variables={{ password }}
          onCompleted={this.handleChangePasswordCompleted}
          onError={error => this.handleChangePasswordError(error)}
        >
          {(changePassword, { loading }) => {
            return (
              <View>
                <Text style={generalStyles.popup_title}>{TextPackage.CHANGE_PASSWORD}</Text>
                <View style={generalStyles.divider_1px} />
                <View style={generalStyles.popup_body}>
                  <Input
                    name="oldPassword"
                    secure
                    placeholder={TextPackage.OLD_PASSWORD}
                    error={hasErrors('oldPassword')}
                    style={[generalStyles.input, hasErrors('oldPassword') && styles.hasErrors]}
                    helperText={errors.oldPassword || ''}
                    onChangeText={text => this.handleTextChange('oldPassword', text)}
                    onEndEditing={() => this.handleEndEditing('oldPassword')}
                    onSubmitEditing={() => this.handleSubmitEditing('oldPassword')}
                  />
                  <Input
                    name="password"
                    secure
                    placeholder={TextPackage.PASSWORD}
                    error={hasErrors('password')}
                    style={[generalStyles.input, hasErrors('password') && styles.hasErrors]}
                    helperText={errors.password || ''}
                    ref={this.passwordRef}
                    onChangeText={text => this.handleTextChange('password', text)}
                    onEndEditing={() => this.handleEndEditing('password')}
                    onSubmitEditing={() => this.handleSubmitEditing('password')}
                  />
                  <Input
                    name="confirmPassword"
                    secure
                    placeholder={TextPackage.CONFRIM_PASSWORD}
                    error={hasErrors('confirmPassword')}
                    style={[generalStyles.input, hasErrors('confirmPassword') && styles.hasErrors]}
                    helperText={errors.confirmPassword || ''}
                    ref={this.confirmPasswordRef}
                    onChangeText={text => this.handleTextChange('confirmPassword', text)}
                    onEndEditing={() => this.handleEndEditing('confirmPassword')}
                  />
                </View>
                {loading ? (
                  <Text style={[generalStyles.popup_cancel_btn, { alignSelf: 'center' }]}>
                    {TextPackage.UPDATING}
                  </Text>
                ) : (
                  <View style={generalStyles.popup_group_btn}>
                    <TouchableOpacity
                      onPress={() => {
                        Keyboard.dismiss();
                        isValid && changePassword();
                      }}
                    >
                      <Text style={generalStyles.popup_ok_btn}>{TextPackage.COMPLETE}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={hidePopup}>
                      <Text style={generalStyles.popup_cancel_btn}>{TextPackage.CANCEL}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          }}
        </Mutation>
      );
    return <View />;
  }
}

export default connect(
  ({ popup }) => ({ popup }),
  actions
)(ChangePassPopup);
