import React, { useState, useEffect, useRef } from 'react';
import { Input, Dialog } from 'src/components';
import { View, StyleSheet } from 'react-native';
import { localization, generalStyles, theme } from 'src/constants';
import { CHANGE_PASSWORD, SIGN_OUT } from 'src/utils/graphqlMutations';
import { useMutation } from 'react-apollo';
import { popupActions, meActions } from 'src/redux/actions';
import { connect } from 'react-redux';
import validate from 'src/utils/validateOverride';
import AppData from 'src/AppData';
import AppConst from 'src/AppConst';
import graphqlErrorHandler from 'src/utils/graphqlErrorHandler';

const TextPackage = localization[AppData.language];

const schema = {
  newPassword: {
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
    equality: { attribute: 'newPassword', message: TextPackage.CONFRIM_PASSWORD_CONFLICT_ERROR }
  }
};

const styles = StyleSheet.create({
  hasErrors: {
    borderBottomColor: theme.colors.error
  }
});

const ChangePassPopup = ({ navigation, showPopup, reduxSignOut }) => {
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const [changePassword] = useMutation(CHANGE_PASSWORD);
  const [signOut, { client }] = useMutation(SIGN_OUT);

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: !errors,
      errors: errors || {}
    }));
  }, [formState.values]);

  const hasErrors = key => formState.touched[key] && formState.errors[key];

  const handleChangePassword = async () => {
    try {
      await changePassword({
        variables: {
          oldPassword: formState.values.oldPassword,
          newPassword: formState.values.newPassword
        }
      });
      showPopup(AppConst.OK_POPUP, {
        title: TextPackage.CHANGE_SUCCESS,
        message: TextPackage.CHANGE_PASSWORD_SUCCESSFUL_MESSAGE,
        confirmText: TextPackage.CONTINUE,
        handleConfirm: async () => {
          await signOut();
          await client.resetStore();
          reduxSignOut();
          navigation.navigate('Auth');
        }
      });
    } catch (error) {
      graphqlErrorHandler(error);
    }
  };

  const handleTextChange = (name, text) => {
    const { values, touched } = formState;
    setFormState(formState => ({
      ...formState,
      values: {
        ...values,
        [name]: text
      }
    }));
    if (
      !touched.confirmPassword &&
      values.confirmPassword &&
      values.newPassword.length === values.confirmPassword.length
    ) {
      setFormState(formState => ({
        ...formState,
        touched: {
          ...touched,
          confirmPassword: true
        }
      }));
    }
  };

  const handleEndEditing = name => {
    const { touched } = formState;
    setFormState(formState => ({
      ...formState,
      touched: {
        ...touched,
        [name]: true
      }
    }));
  };

  const handleSubmitEditing = name => {
    if (name === 'oldPassword') newPasswordRef.current.textInputRef.current.focus();
    if (name === 'newPassword') confirmPasswordRef.current.textInputRef.current.focus();
  };

  return (
    <Dialog
      title={TextPackage.CHANGE_PASSWORD}
      confrimText={TextPackage.COMPLETE}
      handleConfirm={handleChangePassword}
      confirmDisable={!formState.isValid}
    >
      <View>
        <Input
          name="oldPassword"
          secure
          label={TextPackage.OLD_PASSWORD}
          error={hasErrors('oldPassword')}
          style={[generalStyles.input, hasErrors('oldPassword') && styles.hasErrors]}
          helperText={formState.errors.oldPassword || ''}
          onChangeText={text => handleTextChange('oldPassword', text)}
          onEndEditing={() => handleEndEditing('oldPassword')}
          onSubmitEditing={() => handleSubmitEditing('oldPassword')}
        />
        <Input
          name="newPassword"
          secure
          label={TextPackage.PASSWORD}
          error={hasErrors('newPassword')}
          style={[generalStyles.input, hasErrors('newPassword') && styles.hasErrors]}
          helperText={formState.errors.newPassword || ''}
          ref={newPasswordRef}
          onChangeText={text => handleTextChange('newPassword', text)}
          onEndEditing={() => handleEndEditing('newPassword')}
          onSubmitEditing={() => handleSubmitEditing('newPassword')}
        />
        <Input
          name="confirmPassword"
          secure
          label={TextPackage.CONFRIM_PASSWORD}
          error={hasErrors('confirmPassword')}
          style={[generalStyles.input, hasErrors('confirmPassword') && styles.hasErrors]}
          helperText={formState.errors.confirmPassword || ''}
          ref={confirmPasswordRef}
          onChangeText={text => handleTextChange('confirmPassword', text)}
          onEndEditing={() => handleEndEditing('confirmPassword')}
        />
      </View>
    </Dialog>
  );
};

const mapDispatchToProps = dispatch => ({
  showPopup: (popupType, popupProps) => {
    dispatch(popupActions.showPopup(popupType, popupProps));
  },
  updateMe: me => {
    dispatch(meActions.updateMe(me));
  },
  reduxSignOut: () => {
    dispatch(meActions.signOut());
  }
});

export default connect(null, mapDispatchToProps)(ChangePassPopup);
