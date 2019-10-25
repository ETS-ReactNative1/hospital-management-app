import React, { Component } from 'react';
import { StyleSheet, Modal, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { GradientButton, Block, Typography, Input } from 'src/components';

import { useMutation } from 'react-apollo';
import { SIGN_OUT } from 'src/utils/graphqlMutations';

import { theme } from 'src/constants';
import AppData from 'src/AppData';
import AppConst from 'src/AppConst';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.black2,
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',   
    paddingLeft: theme.sizes.base*2,
    paddingRight: theme.sizes.base*2, 
  },
  popup_container: {
    backgroundColor: theme.colors.white,
    width: '100%',
    borderRadius:10,
  },
  divider_1px: {
    width: '100%',
    height: 1,
    backgroundColor: theme.colors.gray2
  },
  title: {

  }
});

export default class SettingsScreen extends Component {
  handleSignOut = async () => {
    const [signOut, { client }] = useMutation(SIGN_OUT);
    await signOut();
    AppData.accessToken = undefined;
    props.navigation.navigate('Auth');
    await client.resetStore();
  };

  handleChangePass = async () => { };

  render() {
    const { userProfile } = AppData
    const { popupConfig, closePopup } = this.props
    
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={popupConfig.type != AppConst.NO_POPUP}
        onRequestClose={() => { console.log('Modal has been closed.'); }}>
        <Block style={styles.container} >
          <KeyboardAvoidingView style={styles.popup_container}>
            <Block style = {{visible: popupConfig.type == AppConst.YES_NO_POPUP}}>
              <Typography>Hello World! ashdhasdhahsd</Typography>
            </Block>

            <TouchableOpacity
              onPress={() => { closePopup() }}>
              <Typography>Hide Modal</Typography>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Block >
      </Modal>
    )
  };
};