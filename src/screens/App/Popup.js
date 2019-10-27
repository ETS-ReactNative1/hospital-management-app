import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text
} from 'react-native';

import { theme, localization } from 'src/constants';
import AppData from 'src/AppData';
import AppConst from 'src/AppConst';

const TextPackage = localization[AppData.language];

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.black2,
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: theme.sizes.base * 2,
    paddingRight: theme.sizes.base * 2
  },
  popup_container: {
    paddingBottom: theme.sizes.padding * 3,
    paddingTop: theme.sizes.padding * 3,
    paddingLeft: theme.sizes.padding * 3,
    paddingRight: theme.sizes.padding * 3,
    backgroundColor: theme.colors.white,
    width: '100%',
    borderRadius: 10
  },
  divider_1px: {
    width: '100%',
    height: 1,
    backgroundColor: theme.colors.gray2
  },
  title: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: theme.sizes.h1
  },
  body: {
    textTransform: 'none',
    fontSize: theme.sizes.h3,
    marginTop: theme.sizes.padding * 2,
    marginBottom: theme.sizes.padding * 2
  },
  btn_group: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ok_btn: {
    textTransform: 'uppercase',
    color: theme.colors.green
  },
  cancel_btn: {
    textTransform: 'uppercase',
    color: theme.colors.gray
  }
});

const CancelBtn = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text style={styles.cancel_btn}>{TextPackage.CANCEL}</Text>
    </TouchableOpacity>
  );
};

const OkBtn = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text style={styles.ok_btn}>{props.okText}</Text>
    </TouchableOpacity>
  );
};

export default class Popup extends Component {
  render() {
    const { popupConfig, closePopup } = this.props;
    console.log(popupConfig);
    return (
      <Modal
        animationType="slide"
        transparent
        visible={popupConfig.type !== AppConst.NO_POPUP}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
        <View style={styles.container}>
          <KeyboardAvoidingView style={styles.popup_container}>
            <View style={{ visible: popupConfig.type === AppConst.OK_CANCEL_POPUP }}>
              <Text style={styles.title}>{popupConfig.title}</Text>
              <Text style={styles.body}>{popupConfig.message}</Text>
              <View style={styles.btn_group}>
                <CancelBtn onPress={closePopup} />
                <OkBtn onPress={popupConfig.okFunc} okText={popupConfig.okText} />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    );
  }
}
